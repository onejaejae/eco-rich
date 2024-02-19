import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { DepartmentService } from '../service/department.service';
import { UpdateDepartmentSalaryDto } from 'src/common/request/department/update-department-salary.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

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
