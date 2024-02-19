import { Injectable } from '@nestjs/common';
import { UpdateDepartmentSalaryDto } from 'src/common/request/department/update-department-salary.dto';
import { DepartmentRepository } from 'src/entities/department/department.repository';
import { EmployeeRepository } from 'src/entities/employee/employee.repository';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly employeeRepository: EmployeeRepository,
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
