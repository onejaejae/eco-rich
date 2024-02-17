import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import {
  Employee,
  GetEmployee,
  GetEmployeeJobHistory,
} from './employee.entity';
import { TransformPlainToInstance } from 'class-transformer';

@Injectable()
export class EmployeeRepository extends GenericTypeOrmRepository<Employee> {
  constructor(protected readonly txManager: TransactionManager) {
    super(Employee);
  }

  getName(): EntityTarget<Employee> {
    return Employee.name;
  }

  @TransformPlainToInstance(GetEmployee)
  getEmployee(employeeId: number): Promise<GetEmployee> {
    return this.getRepository().findOne({
      where: { employeeId },
      relations: [
        'Department',
        'Job',
        'ManagedEmployees',
        'ManagedDepartments',
        'Manager',
      ],
    });
  }

  @TransformPlainToInstance(GetEmployeeJobHistory)
  getEmployeeJobHistory(employeeId: number): Promise<GetEmployeeJobHistory> {
    return this.getRepository().findOne({
      where: { employeeId },
      relations: [
        'JobHistories',
        'JobHistories.Job',
        'JobHistories.Department',
      ],
    });
  }
}
