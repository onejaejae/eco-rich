import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { JobHistory } from '../job-history/job-history.entity';
import { BaseTimeEntity } from 'src/core/database/typeorm/baseTime.entity';
import { Employee } from '../employee/employee.entity';

@Entity('jobs')
export class Job extends BaseTimeEntity {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  jobId: string;

  @Column({ type: 'varchar', length: 35 })
  jobTitle: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 0,
    unsigned: true,
    nullable: true,
  })
  minSalary: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 0,
    unsigned: true,
    nullable: true,
  })
  maxSalary: number;

  @OneToMany(() => Employee, (employee) => employee.Job)
  Employees: Employee[];

  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.Job)
  JobHistories: JobHistory[];
}
