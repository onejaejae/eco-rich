import { Module } from '@nestjs/common';
import { DepartmentRepositoryModule } from 'src/entities/department/department-repository.module';

@Module({
  imports: [DepartmentRepositoryModule],
  controllers: [],
  providers: [],
})
export class DepartmentModule {}
