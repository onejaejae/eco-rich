import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from 'src/entities/department/department.repository';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async getDepartmentDetail(departmentId: number) {
    await this.departmentRepository.findOneOrThrow({
      departmentId,
    });
    return this.departmentRepository.getDepartmentDetail(departmentId);
  }
}
