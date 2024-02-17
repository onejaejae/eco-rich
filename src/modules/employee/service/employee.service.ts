import { Injectable } from '@nestjs/common';
import { GetEmployee } from 'src/entities/employee/employee.entity';
import { EmployeeRepository } from 'src/entities/employee/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getEmployee(employeeId: number): Promise<GetEmployee> {
    return this.employeeRepository.getEmployee(employeeId);
  }
}
