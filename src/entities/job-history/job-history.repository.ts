import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { JobHistory } from './job-history.entity';
import { IJobHistoryRepository } from './job-history-repository.interface';

@Injectable()
export class JobHistoryRepository
  extends GenericTypeOrmRepository<JobHistory>
  implements IJobHistoryRepository
{
  constructor(protected readonly txManager: TransactionManager) {
    super(JobHistory);
  }

  getName(): EntityTarget<JobHistory> {
    return JobHistory.name;
  }
}
