import { Request, Response, NextFunction } from "express";
import {
  EmployeeType,
  LoginType,
  EmailType,
  verifyOTPType,
  ResetPassType,
} from "../types/employee.types.ts";
import { VerifyErrors, JwtPayload } from "jsonwebtoken";
const jwt = require("jsonwebtoken");
import { redisClient } from "../utility/redis.utility.ts";
import Joi from "joi";
export const validateEmployee = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeValidation: EmployeeType = await schema.validateAsync(
        req.body
      );
      req.body = employeeValidation;
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(500).json({ message: err.message });
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
    }
  };
};

export const validateLogin = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateLogin: LoginType = await schema.validateAsync(req.body);
      req.body = validateLogin;
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(500).json({ message: err.message });
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
    }
  };
};

export const ValidateForgetPassword = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateEmail: EmailType = await schema.validateAsync(req.body);
      req.body = validateEmail;
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(500).json({ message: err.message });
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
    }
  };
};

export const validateOTPVerification = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate: verifyOTPType = await schema.validateAsync(req.body);
      req.body = validate;
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(500).json({ message: err.message });
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
    }
  };
};

export const valiadteResetPassword = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate: ResetPassType = await schema.validateAsync(req.body);
      req.body = validate;
      if (validate.password != validate.reentered_password) {
        res
          .status(400)
          .json({ message: "Password and Re Entered Password Doesn't Match." });
      } else {
        next();
      }
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(500).json({ message: err.message });
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
    }
  };
};

export const validateToken = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { access_token } = req.body;
      const redisToken = await redisClient.get(access_token);
      if (redisToken == null) {
        res.status(401).json({ message: "Unauthorized Access" });
      } else {
        const secretKey = process.env.JWT_Access_SECRET || "";
        await jwt.verify(
          access_token,
          secretKey,
          (err: VerifyErrors, decoded: JwtPayload) => {
            if (err) {
              res.status(500).json({ message: err.message });
            } else {
              req.params.id = decoded.id;
              next();
            }
          }
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error.";
      res.status(500).json({ message: message });
    }
  };
};
