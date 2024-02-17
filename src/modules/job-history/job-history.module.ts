import { Module } from '@nestjs/common';
import { JobHistoryRepositoryModule } from 'src/entities/job-history/job-history-repository.module';

@Module({
  imports: [JobHistoryRepositoryModule],
  controllers: [],
  providers: [],
})
export class JobHistoryModule {}
