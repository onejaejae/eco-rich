import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DepartmentService } from '../service/department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('/:departmentId')
  getDepartmentDetail(@Param('departmentId') departmentId: number) {
    return this.departmentService.getDepartmentDetail(departmentId);
  }
}
