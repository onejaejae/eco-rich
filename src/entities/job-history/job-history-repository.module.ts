import { Module } from '@nestjs/common';
import { JobHistoryRepository } from './job-history.repository';

@Module({
  providers: [JobHistoryRepository],
  exports: [JobHistoryRepository],
})
export class JobHistoryRepositoryModule {}
