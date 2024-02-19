import { ClassProvider, Module } from '@nestjs/common';
import { DepartmentRepositoryModule } from 'src/entities/department/department-repository.module';
import { DepartmentController } from './controller/department.controller';
import { DepartmentService } from './service/department.service';
import { EmployeeRepositoryModule } from 'src/entities/employee/employee-repository.module';
import { DepartmentServiceKey } from './service/department-service.interface';

const departmentService: ClassProvider = {
  provide: DepartmentServiceKey,
  useClass: DepartmentService,
};
@Module({
  imports: [DepartmentRepositoryModule, EmployeeRepositoryModule],
  controllers: [DepartmentController],
  providers: [departmentService],
})
export class DepartmentModule {}
