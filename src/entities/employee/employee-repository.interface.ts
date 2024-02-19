import { GenericRepository } from 'src/core/database/generic/generic.repository';
import {
  Employee,
  GetEmployee,
  GetEmployeeJobHistory,
} from './employee.entity';

export const EmployeeRepositoryKey = 'EmployeeRepositoryKey';

export interface IEmployeeRepository extends GenericRepository<Employee> {
  getEmployee(employeeId: number): Promise<GetEmployee>;
  getEmployeeJobHistory(employeeId: number): Promise<GetEmployeeJobHistory>;
}
