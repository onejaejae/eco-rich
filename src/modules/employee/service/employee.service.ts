import { Inject, Injectable } from '@nestjs/common';
import {
  EmployeeRepositoryKey,
  IEmployeeRepository,
} from 'src/entities/employee/employee-repository.interface';
import {
  GetEmployee,
  GetEmployeeJobHistory,
} from 'src/entities/employee/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EmployeeRepositoryKey)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

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
