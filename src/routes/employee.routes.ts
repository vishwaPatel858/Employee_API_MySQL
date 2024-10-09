import express from "express";
export const router = express.Router();
import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  login,
  logout,
  forgetPassword,
  verifyOTP,
  resetPassword
} from "../controllers/employee.controller.ts";
import { validateEmployee } from "../middleware/employee.middleware.ts";
import {
  employeeSchema,
  employeeUpdateSchema,
} from "../validations/employee.validations.ts";
router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", validateEmployee(employeeSchema), addEmployee);
router.post("/update", validateEmployee(employeeUpdateSchema), updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgetpassword", forgetPassword);
router.post("/verifyotp", verifyOTP);
router.post("/resetpassword", resetPassword);
