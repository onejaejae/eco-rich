import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Department } from '../department/department.entity';
import {
  JobHistory,
  JobHistoryWithJobAndDepartment,
} from '../job-history/job-history.entity';
import { BaseTimeEntity } from 'src/core/database/typeorm/baseTime.entity';
import { Job } from '../job/job.entity';
import { Type } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

@Entity('employees')
export class Employee extends BaseTimeEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  employeeId: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 25 })
  lastName: string;

  @Column({ type: 'varchar', length: 25 })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: 'date' })
  hireDate: Date;

  @Column({ type: 'varchar', length: 10 })
  jobId: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  salary: number;

  @Column({ type: 'decimal', precision: 2, scale: 2, nullable: true })
  commissionPct: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  managerId: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  departmentId: number;

  @OneToMany(() => Employee, (employee) => employee.Manager)
  ManagedEmployees: Employee[];

  @OneToMany(() => Department, (department) => department.Manager)
  ManagedDepartments: Department[];

  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.Employee)
  JobHistories: JobHistory[];

  @ManyToOne(() => Job, (job) => job.Employees)
  @JoinColumn([{ name: 'job_id', referencedColumnName: 'jobId' }])
  Job: Job;

  @ManyToOne(() => Department, (department) => department.Employees)
  @JoinColumn([{ name: 'department_id', referencedColumnName: 'departmentId' }])
  Department: Department;

  @ManyToOne(() => Employee, (manager) => manager.ManagedEmployees)
  @JoinColumn([{ name: 'manager_id', referencedColumnName: 'employeeId' }])
  Manager: Employee;

  updateSalary(increaseRate: number) {
    if (increaseRate <= 0)
      throw new BadRequestException(
        `increaseRate: ${increaseRate}는 양수여야 합니다.`,
      );

    this.salary *= 1 + increaseRate;
  }
}

export class GetEmployee extends Employee {
  @Type(() => Department)
  Department: Department;

  @Type(() => Job)
  Job: Job;

  @Type(() => Employee)
  ManagedEmployees: Employee[];

  @Type(() => Department)
  ManagedDepartments: Department[];

  @Type(() => Employee)
  Manager: Employee;
}

export class GetEmployeeJobHistory extends Employee {
  @Type(() => JobHistoryWithJobAndDepartment)
  JobHistories: JobHistoryWithJobAndDepartment[];
}
