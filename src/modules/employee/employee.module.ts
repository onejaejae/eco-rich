import { Module } from '@nestjs/common';
import { EmployeeRepositoryModule } from 'src/entities/employee/employee-repository.module';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './service/employee.service';

@Module({
  imports: [EmployeeRepositoryModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
