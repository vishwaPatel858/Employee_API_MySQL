import joi from "joi";
export const employeeSchema = joi.object({
  first_name: joi
    .string()
    .required()
    .pattern(new RegExp(/^[a-zA-Z]*$/))
    .messages({
      "string.empty": "First Name is required.",
      "string.pattern.base":
        "first_name cannot contain numbers , special characters.",
    }),
  last_name: joi
    .string()
    .required()
    .pattern(new RegExp(/^[a-zA-Z]*$/))
    .messages({
      "string.empty": "First Name is required.",
      "string.pattern.base":
        "last_name cannot contain numbers , special characters.",
    }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email format.",
  }),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
      )
    )
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must contain 1 Uppercase letter , 1 lowercase letter , 1 digit and 1 special character.Password length must be minimum 8 and maximum 10 characters.",
    }),
});

export const employeeUpdateSchema = joi.object({
  emp_id: joi.number().required().messages({
    "string.empty": "Employee id is required",
  }),
  first_name: joi
    .string()
    .required()
    .pattern(new RegExp(/^[a-zA-Z]*$/))
    .messages({
      "string.empty": "First Name is required.",
      "string.pattern.base":
        "first_name cannot contain numbers , special characters.",
    }),
  last_name: joi
    .string()
    .required()
    .pattern(new RegExp(/^[a-zA-Z]*$/))
    .messages({
      "string.empty": "First Name is required.",
      "string.pattern.base":
        "last_name cannot contain numbers , special characters.",
    }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email format.",
  }),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
      )
    )
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must contain 1 Uppercase letter , 1 lowercase letter , 1 digit and 1 special character.Password length must be minimum 8 and maximum 10 characters.",
    }),
});

export const LoginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email format.",
  }),
  password: joi.string().required().messages({
    "string.empty": "password is required",
  }),
});

export const EmailSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid Email Format",
  }),
});

export const verifyOTPSchema = joi.object({
  email: joi.string().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid Email Format.",
  }),
  otp: joi.number().required().messages({
    "string.empty": "OTP is required",
  }),
});

export const resetPasswordSchema = joi.object({
  email: joi.string().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid Email Format.",
  }),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
      )
    )
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must contain 1 Uppercase letter , 1 lowercase letter , 1 digit and 1 special character.Password length must be minimum 8 and maximum 10 characters.",
    }),
  reentered_password: joi.string().required().messages({
    "string.empty": "Please ReEnter the password.",
  }),
});

export const tokenSchema = joi.object({
  access_token: joi.string().required().messages({
    "string.empty": "Access Token is required.",
  }),
});
