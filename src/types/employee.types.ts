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
