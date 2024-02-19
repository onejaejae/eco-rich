import { UpdateDepartmentSalaryDto } from 'src/common/request/department/update-department-salary.dto';
import { Department } from 'src/entities/department/department.entity';
import { Employee } from 'src/entities/employee/employee.entity';

export const DepartmentServiceKey = 'DepartmentServiceKey';

export interface IDepartmentService {
  getDepartmentDetail(departmentId: number): Promise<Department>;
  updateDepartmentSalary(
    departmentId: number,
    updateDepartmentSalaryDto: UpdateDepartmentSalaryDto,
  ): Promise<Employee[]>;
}
