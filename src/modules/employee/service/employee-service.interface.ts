import {
  GetEmployee,
  GetEmployeeJobHistory,
} from 'src/entities/employee/employee.entity';

export const EmployeeServiceKey = 'EmployeeServiceKey';

export interface IEmployeeService {
  getEmployee(employeeId: number): Promise<GetEmployee>;
  getEmployeeJobHistory(employeeId: number): Promise<GetEmployeeJobHistory>;
}
