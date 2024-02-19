import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Job } from './job.entity';
import { IJobRepository } from './job-repository.interface';

@Injectable()
export class JobRepository
  extends GenericTypeOrmRepository<Job>
  implements IJobRepository
{
  constructor(protected readonly txManager: TransactionManager) {
    super(Job);
  }

  getName(): EntityTarget<Job> {
    return Job.name;
  }
}
