import { Module } from '@nestjs/common';
import { JobRepositoryModule } from 'src/entities/job/job-repository.module';

@Module({
  imports: [JobRepositoryModule],
  controllers: [],
  providers: [],
})
export class JobModule {}
