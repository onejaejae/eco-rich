import { Inject, Injectable } from '@nestjs/common';
import { UpdateDepartmentSalaryDto } from 'src/common/request/department/update-department-salary.dto';
import {
  DepartmentRepositoryKey,
  IDepartmentRepository,
} from 'src/entities/department/department-repository.interface';
import { Department } from 'src/entities/department/department.entity';
import {
  EmployeeRepositoryKey,
  IEmployeeRepository,
} from 'src/entities/employee/employee-repository.interface';
import { Employee } from 'src/entities/employee/employee.entity';
import { IDepartmentService } from './department-service.interface';

@Injectable()
export class DepartmentService implements IDepartmentService {
  constructor(
    @Inject(DepartmentRepositoryKey)
    private readonly departmentRepository: IDepartmentRepository,
    @Inject(EmployeeRepositoryKey)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async getDepartmentDetail(departmentId: number): Promise<Department> {
    await this.departmentRepository.findOneOrThrow({
      departmentId,
    });
    return this.departmentRepository.getDepartmentDetail(departmentId);
  }

  async updateDepartmentSalary(
    departmentId: number,
    updateDepartmentSalaryDto: UpdateDepartmentSalaryDto,
  ): Promise<Employee[]> {
    const { increaseRate } = updateDepartmentSalaryDto;

    await this.departmentRepository.findOneOrThrow({
      departmentId,
    });

    const { Employees } =
      await this.departmentRepository.getDepartmentWithEmployees(departmentId);

    Employees.map((employee) => employee.updateSalary(increaseRate));
    return this.employeeRepository.updateMany(Employees);
  }
}
