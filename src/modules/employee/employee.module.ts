import { ClassProvider, Module } from '@nestjs/common';
import { EmployeeRepositoryModule } from 'src/entities/employee/employee-repository.module';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './service/employee.service';
import { EmployeeServiceKey } from './service/employee-service.interface';

const employeeService: ClassProvider = {
  provide: EmployeeServiceKey,
  useClass: EmployeeService,
};
@Module({
  imports: [EmployeeRepositoryModule],
  controllers: [EmployeeController],
  providers: [employeeService],
})
export class EmployeeModule {}
