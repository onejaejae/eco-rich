import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Job } from './job.entity';

@Injectable()
export class JobRepository extends GenericTypeOrmRepository<Job> {
  constructor(protected readonly txManager: TransactionManager) {
    super(Job);
  }

  getName(): EntityTarget<Job> {
    return Job.name;
  }
}
