import { ClassProvider, Module } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { EmployeeRepositoryKey } from './employee-repository.interface';

export const employeeRepository: ClassProvider = {
  provide: EmployeeRepositoryKey,
  useClass: EmployeeRepository,
};
@Module({
  providers: [employeeRepository],
  exports: [employeeRepository],
})
export class EmployeeRepositoryModule {}
