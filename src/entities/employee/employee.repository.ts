import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeRepository extends GenericTypeOrmRepository<Employee> {
  constructor(protected readonly txManager: TransactionManager) {
    super(Employee);
  }

  getName(): EntityTarget<Employee> {
    return Employee.name;
  }
}
