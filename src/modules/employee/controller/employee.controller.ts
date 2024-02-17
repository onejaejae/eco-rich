import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { GetEmployee } from 'src/entities/employee/employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/:employeeId')
  async getEmployee(
    @Param('employeeId') employeeId: number,
  ): Promise<GetEmployee> {
    return this.employeeService.getEmployee(employeeId);
  }
}
