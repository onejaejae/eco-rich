import { Module } from '@nestjs/common';
import { EmployeeRepositoryModule } from 'src/entities/employee/employee-repository.module';

@Module({
  imports: [EmployeeRepositoryModule],
  controllers: [],
  providers: [],
})
export class EmployeeModule {}
