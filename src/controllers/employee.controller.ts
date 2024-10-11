import {
  getAllEmployees,
  getAEmployeeById,
  craeteEmployee,
  modifyEmployee,
  employeeDelete,
  employeeLogin,
  employeeLogout,
  employeeForgetPassword,
  employeeVerifyOTP,
  employeeResetPassword,
} from "../services/employee.services.ts";
import { EmployeeType } from "../types/employee.types.ts";
import { Request, Response } from "express";

export const getEmployees = (req: Request, res: Response) => {
  getAllEmployees()
    .then((response) => {
      res.status(response.status).json(response);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await getAEmployeeById(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const addEmployee = (req: Request, res: Response) => {
  try {
    const employee: EmployeeType = req.body;
    craeteEmployee(employee)
      .then((response: any) => {
        res.status(200).json(response);
      })
      .catch((err: any) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const updateEmployee = (req: Request, res: Response) => {
  try {
    const employee: EmployeeType = req.body;
    modifyEmployee(employee)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const deleteEmployee = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    employeeDelete(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    employeeLogin(email, password)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;
    employeeLogout(access_token)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const forgetPassword = (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    employeeForgetPassword(email)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const verifyOTP = (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    employeeVerifyOTP(otp, email)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const resetPassword = (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    employeeResetPassword(password, email)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};
