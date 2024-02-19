import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  GetEmployee,
  GetEmployeeJobHistory,
} from 'src/entities/employee/employee.entity';
import {
  EmployeeServiceKey,
  IEmployeeService,
} from '../service/employee-service.interface';

@Controller('employees')
export class EmployeeController {
  constructor(
    @Inject(EmployeeServiceKey)
    private readonly employeeService: IEmployeeService,
  ) {}

  @Get('/:employeeId')
  async getEmployee(
    @Param('employeeId') employeeId: number,
  ): Promise<GetEmployee> {
    return this.employeeService.getEmployee(employeeId);
  }

  @Get('/:employeeId/job-history')
  async getEmployeeJobHistory(
    @Param('employeeId') employeeId: number,
  ): Promise<GetEmployeeJobHistory> {
    return this.employeeService.getEmployeeJobHistory(employeeId);
  }
}
