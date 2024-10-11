import {
  EmployeeType,
  Password,
  MySQLRes,
  EmpMySQLRes,
} from "../types/employee.types.ts";
const jwt = require("jsonwebtoken");
import { VerifyErrors, JwtPayload } from "jsonwebtoken";
import {
  queryAsync,
  sqlQueryAsync,
  generateEncryptedPassword,
  validatePassword,
  generateAccessToken,
  generateRefreshToken,
} from "../utility/employee.utility.ts";
import { redisClient } from "../utility/redis.utility.ts";
import { sendMail, generateOTP } from "../utility/mail.utility.ts";

export const getAllEmployees = async () => {
  try {
    const query = "SELECT * FROM   employee";
    let response: EmployeeType[] = await queryAsync<EmployeeType>(query);
    if (response.length == 0) {
      return {
        message: "Employees not found!",
        status: 404,
      };
    }
    return {
      employees: response,
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};

export const getAEmployeeById = async (id: number) => {
  try {
    const query = `SELECT * FROM employee WHERE emp_id = ${id} `;
    const response: EmployeeType[] = await queryAsync<EmployeeType>(query);
    if (response.length == 0) {
      return {
        message: "Employee not found",
        status: 404,
      };
    }
    return response;
  } catch (err) {
    throw err;
  }
};

export const craeteEmployee = async (employee: EmployeeType) => {
  try {
    let query = `SELECT emp_id FROM employee WHERE email = '${employee.email}' `;
    const isDuplicateEmail = await queryAsync(query);
    if (isDuplicateEmail.length > 0) {
      return {
        message: "Email already exists.",
        status: 409,
      };
    }
    employee.password = await generateEncryptedPassword(employee.password);
    query = `INSERT INTO employee (first_name, last_name, email, password) VALUES ('${employee.first_name}' , '${employee.last_name}' , '${employee.email}' , '${employee.password}')`;
    const newEmp = await queryAsync(query);
    return {
      message: "Employee Created Successfully.",
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};

export const modifyEmployee = async (employee: EmployeeType) => {
  try {
    let query = `SELECT emp_id FROM employee WHERE emp_id = ${employee.emp_id}`;
    const userExists = await queryAsync(query);
    console.log(userExists);
    if (userExists.length == 0) {
      return {
        message: "Employee Not Found!",
        status: 404,
      };
    }
    query = `SELECT emp_id FROM employee WHERE email = '${employee.email}' and emp_id != ${employee.emp_id}`;
    const isDuplicateEmail = await queryAsync(query);
    console.log(isDuplicateEmail);
    if (isDuplicateEmail.length > 0) {
      return {
        message: "Duplicate Email",
        status: 409,
      };
    }
    employee.password = await generateEncryptedPassword(employee.password);
    query = `UPDATE employee 
        SET first_name = '${employee.first_name}' , last_name='${employee.last_name}' , email = '${employee.email}' , password = '${employee.password}' 
        WHERE emp_id = ${employee.emp_id}`;
    const updatedEmployee = await queryAsync(query);
    return {
      message: "Employee Updated Successfully",
      status: 404,
    };
  } catch (err) {
    throw err;
  }
};

export const employeeDelete = async (id: string) => {
  try {
    let query = `DELETE FROM employee WHERE emp_id = ${id}`;
    const deleteEmp: MySQLRes = await sqlQueryAsync<MySQLRes>(query);
    if (deleteEmp.affectedRows == 0) {
      return {
        message: "Employee Not Found!.",
        status: 404,
      };
    } else {
      return {
        message: "Employee Deleted Successfully.",
        status: 200,
      };
    }
  } catch (err) {
    throw err;
  }
};

export const employeeLogin = async (email: string, password: string) => {
  try {
    let query = `SELECT emp_id,password FROM employee WHERE email = '${email}'`;
    const empExits: EmpMySQLRes[] = await queryAsync<EmpMySQLRes>(query);
    console.log(empExits);
    if (empExits.length == 0) {
      return {
        message: "Employee Not Found.",
        status: 404,
      };
    }
    const emp_id = empExits[0].emp_id || 0;
    const encryptedPass = empExits[0].password || "";
    const isValidPass = await validatePassword(password, encryptedPass);
    if (!isValidPass) {
      return {
        message: "Invalid Password.",
        status: 401,
      };
    }
    const access_token = await generateAccessToken(emp_id.toString());
    const refresh_token = await generateRefreshToken(emp_id.toString());
    return {
      message: "login successfully",
      access_token: access_token,
      refresh_token: refresh_token,
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};

export const employeeLogout = async (access_token: string) => {
  try {
    const redisId = await redisClient.get(access_token);
    if (redisId == null) {
      return {
        message: "Unauthorized Access.",
        status: 401,
      };
    }
    const secretKey = process.env.JWT_Access_SECRET || "";
    const emp_id = await jwt.verify(
      access_token,
      secretKey,
      (err: VerifyErrors, decoded: JwtPayload) => {
        if (err) {
          throw err;
        } else {
          return decoded.id;
        }
      }
    );
    let query = `SELECT password FROM employee WHERE emp_id = ${emp_id}`;
    const empExits = await queryAsync(query);
    if (empExits.length == 0) {
      return {
        message: "Emplyee Doesn't exists",
        status: 404,
      };
    }
    await redisClient.del(access_token);
    await redisClient.del(emp_id);
    return {
      message: "Logout Successfully!.",
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};

export const employeeForgetPassword = async (email: string) => {
  try {
    let query = `SELECT password FROM employee WHERE email = '${email}'`;
    const isEmpExists = await queryAsync(query);
    if (isEmpExists.length == 0) {
      return {
        message: "No employee found with this email.",
        status: 404,
      };
    }
    let mainRes = {
      message: "Something went wrong.",
      status: 500,
    };
    const otp = generateOTP();
    await redisClient.del(email);
    await redisClient.set(email, otp);
    const mailOptions = {
      to: email,
      subject: "ForgetPassword OTP",
      message: `Your otp is <strong>${otp}</strong>`,
    };
    await sendMail(mailOptions)
      .then((response) => {
        mainRes = {
          message: "OTP sent Successfully.",
          status: 200,
        };
        setTimeout(async () => {
          await redisClient.del(email);
          console.log("OTP deleted after 1min.");
        }, 60000);
      })
      .catch((err) => {
        throw err;
      });
    return mainRes;
  } catch (err) {
    throw err;
  }
};

export const employeeVerifyOTP = async (otp: string, email: string) => {
  try {
    const actualOTP = await redisClient.get(email);
    if (otp == actualOTP) {
      await redisClient.del(email);
      return {
        message: "OTP Verified Sucessfully.",
        status: 200,
      };
    } else {
      return {
        message: "Incorrect OTP.",
      };
    }
  } catch (err) {
    throw err;
  }
};

export const employeeResetPassword = async (
  password: string,
  email: string
) => {
  try {
    let query = `SELECT password FROM employee WHERE email = '${email}'`;
    const isEmpExists: Password[] = await queryAsync<Password>(query);
    if (isEmpExists.length == 0) {
      return {
        message: "Employee Not Fund",
        status: 404,
      };
    }
    const encryptedPassword = await generateEncryptedPassword(password);
    query = `UPDATE employee SET password = '${password}' WHERE email = '${email}'`;
    const resUpdated: MySQLRes = await sqlQueryAsync<MySQLRes>(query);
    console.log(resUpdated);
    return {
      message: "Password reset successfully.",
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};
