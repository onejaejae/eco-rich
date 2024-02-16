import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';
import { Department } from '../department/department.entity';
import { Job } from '../job/job.entity';

@Entity('job_history')
@Index(['employeeId', 'startDate'], { unique: true })
export class JobHistory {
  @PrimaryColumn({ type: 'int', unsigned: true })
  employeeId: number;

  @PrimaryColumn({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'varchar', length: 10 })
  jobId: string;

  @Column({ type: 'int', unsigned: true })
  departmentId: number;

  @ManyToOne(() => Employee, (employee) => employee.JobHistories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'employee_id', referencedColumnName: 'employeeId' }])
  Employee: Employee;

  @ManyToOne(() => Department, (department) => department.JobHistories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'department_id', referencedColumnName: 'departmentId' }])
  department: Department;

  @ManyToOne(() => Job, (job) => job.JobHistories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'job_id', referencedColumnName: 'jobId' }])
  Job: Job;
}
