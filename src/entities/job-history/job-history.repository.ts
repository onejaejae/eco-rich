import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { JobHistory } from './job-history.entity';

@Injectable()
export class JobHistoryRepository extends GenericTypeOrmRepository<JobHistory> {
  constructor(protected readonly txManager: TransactionManager) {
    super(JobHistory);
  }

  getName(): EntityTarget<JobHistory> {
    return JobHistory.name;
  }
}
