import { Inject, Injectable } from '@nestjs/common';
import { UpdateDepartmentSalaryDto } from 'src/common/request/department/update-department-salary.dto';
import {
  DepartmentRepositoryKey,
  IDepartmentRepository,
} from 'src/entities/department/department-repository.interface';
import {
  EmployeeRepositoryKey,
  IEmployeeRepository,
} from 'src/entities/employee/employee-repository.interface';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(DepartmentRepositoryKey)
    private readonly departmentRepository: IDepartmentRepository,
    @Inject(EmployeeRepositoryKey)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async getDepartmentDetail(departmentId: number) {
    await this.departmentRepository.findOneOrThrow({
      departmentId,
    });
    return this.departmentRepository.getDepartmentDetail(departmentId);
  }

  async updateDepartmentSalary(
    departmentId: number,
    updateDepartmentSalaryDto: UpdateDepartmentSalaryDto,
  ) {
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
