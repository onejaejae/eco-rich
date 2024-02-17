import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Department } from './department.entity';

@Injectable()
export class DepartmentRepository extends GenericTypeOrmRepository<Department> {
  constructor(protected readonly txManager: TransactionManager) {
    super(Department);
  }

  getName(): EntityTarget<Department> {
    return Department.name;
  }
}