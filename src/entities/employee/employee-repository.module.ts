import { Module } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';

@Module({
  providers: [EmployeeRepository],
  exports: [EmployeeRepository],
})
export class EmployeeRepositoryModule {}
