import { Request, Response, NextFunction } from "express";
import { EmployeeType } from "../types/employee.types.ts";
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
