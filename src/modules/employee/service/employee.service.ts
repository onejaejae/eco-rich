import { Injectable } from '@nestjs/common';
import {
  GetEmployee,
  GetEmployeeJobHistory,
} from 'src/entities/employee/employee.entity';
import { EmployeeRepository } from 'src/entities/employee/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getEmployee(employeeId: number): Promise<GetEmployee> {
    await this.employeeRepository.findOneOrThrow({ employeeId });
    return this.employeeRepository.getEmployee(employeeId);
  }

  async getEmployeeJobHistory(
    employeeId: number,
  ): Promise<GetEmployeeJobHistory> {
    await this.employeeRepository.findOneOrThrow({ employeeId });
    return this.employeeRepository.getEmployeeJobHistory(employeeId);
  }
}
