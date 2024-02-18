import { Module } from '@nestjs/common';
import { DepartmentRepositoryModule } from 'src/entities/department/department-repository.module';
import { DepartmentController } from './controller/department.controller';
import { DepartmentService } from './service/department.service';

@Module({
  imports: [DepartmentRepositoryModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
