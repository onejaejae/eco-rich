import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Department } from '../department/department.entity';
import { JobHistory } from '../job-history/job-history.entity';

@Entity('employees')
export class Employee {
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

  @ManyToOne(() => Department, (department) => department.Employees)
  @JoinColumn([{ name: 'department_id', referencedColumnName: 'departmentId' }])
  Department: Department;

  @ManyToOne(() => Employee, (manager) => manager.ManagedEmployees)
  @JoinColumn([{ name: 'manager_id', referencedColumnName: 'employeeId' }])
  Manager: Employee;
}
