import { ClassProvider, Module } from '@nestjs/common';
import { JobHistoryRepository } from './job-history.repository';
import { JobHistoryRepositoryKey } from './job-history-repository.interface';

export const jobHistoryRepository: ClassProvider = {
  provide: JobHistoryRepositoryKey,
  useClass: JobHistoryRepository,
};

@Module({
  providers: [jobHistoryRepository],
  exports: [jobHistoryRepository],
})
export class JobHistoryRepositoryModule {}
