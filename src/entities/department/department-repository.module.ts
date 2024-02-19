import { ClassProvider, Module } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentRepositoryKey } from './department-repository.interface';

export const departmentRepository: ClassProvider = {
  provide: DepartmentRepositoryKey,
  useClass: DepartmentRepository,
};

@Module({
  providers: [departmentRepository],
  exports: [departmentRepository],
})
export class DepartmentRepositoryModule {}
