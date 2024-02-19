import { Body, Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { UpdateDepartmentSalaryDto } from 'src/common/request/department/update-department-salary.dto';
import {
  DepartmentServiceKey,
  IDepartmentService,
} from '../service/department-service.interface';

@Controller('departments')
export class DepartmentController {
  constructor(
    @Inject(DepartmentServiceKey)
    private readonly departmentService: IDepartmentService,
  ) {}

  @Get('/:departmentId')
  getDepartmentDetail(@Param('departmentId') departmentId: number) {
    return this.departmentService.getDepartmentDetail(departmentId);
  }

  @Patch('/:departmentId/salary')
  updateDepartmentSalary(
    @Param('departmentId') departmentId: number,
    @Body() updateDepartmentSalaryDto: UpdateDepartmentSalaryDto,
  ) {
    return this.departmentService.updateDepartmentSalary(
      departmentId,
      updateDepartmentSalaryDto,
    );
  }
}
