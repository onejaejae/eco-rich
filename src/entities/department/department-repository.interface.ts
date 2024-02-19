import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { Department } from './department.entity';

export const DepartmentRepositoryKey = 'DepartmentRepositoryKey';

export interface IDepartmentRepository extends GenericRepository<Department> {
  getDepartmentDetail(departmentId: number): Promise<Department>;
  getDepartmentWithEmployees(departmentId: number): Promise<Department>;
}
