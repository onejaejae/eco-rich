import { ClassProvider, Module } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { JobRepositoryKey } from './job-repository.interface';

export const jobRepository: ClassProvider = {
  provide: JobRepositoryKey,
  useClass: JobRepository,
};

@Module({
  providers: [jobRepository],
  exports: [jobRepository],
})
export class JobRepositoryModule {}
