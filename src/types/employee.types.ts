export interface EmployeeType {
  emp_id?: number;
  first_name: string;
  last_name: String;
  email: string;
  password: string;
}

export interface Password {
  password: string;
}

export interface MailOptions {
  to: string;
  message: string;
  subject: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface EmailType {
  email: string;
}

export interface MySQLRes {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: number;
  changedRows: number;
}

export interface EmpMySQLRes {
  emp_id?: number;
  first_name?: string;
  last_name?: String;
  email?: string;
  password?: string;
}

export interface verifyOTPType {
  email: string;
  otp: number;
}

export interface ResetPassType {
  email: string;
  password: string;
  reentered_password: string;
}
