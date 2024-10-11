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
  resetPassword,
} from "../controllers/employee.controller.ts";
import {
  validateEmployee,
  validateLogin,
  ValidateForgetPassword,
  validateOTPVerification,
  valiadteResetPassword,
  validateToken,
} from "../middleware/employee.middleware.ts";
import {
  employeeSchema,
  employeeUpdateSchema,
  LoginSchema,
  EmailSchema,
  verifyOTPSchema,
  resetPasswordSchema,
  tokenSchema,
} from "../validations/employee.validations.ts";
router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", validateEmployee(employeeSchema), addEmployee);
router.post("/update", validateEmployee(employeeUpdateSchema), updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/login", validateLogin(LoginSchema), login);
router.post("/logout", logout);
router.post(
  "/forgetpassword",
  ValidateForgetPassword(EmailSchema),
  forgetPassword
);
router.post("/verifyotp", validateOTPVerification(verifyOTPSchema), verifyOTP);
router.post(
  "/resetpassword",
  valiadteResetPassword(resetPasswordSchema),
  resetPassword
);

router.post("/profile", validateToken(tokenSchema), getEmployee);
