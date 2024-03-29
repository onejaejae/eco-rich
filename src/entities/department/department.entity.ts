import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Location } from '../location/location.entity';
import { Employee } from '../employee/employee.entity';
import { JobHistory } from '../job-history/job-history.entity';
import { BaseTimeEntity } from 'src/core/database/typeorm/baseTime.entity';

@Entity('departments')
export class Department extends BaseTimeEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  departmentId: number;

  @Column({ type: 'varchar', length: 30 })
  departmentName: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  locationId: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  managerId: number;

  @OneToMany(() => Employee, (employee) => employee.Department)
  Employees: Employee[];

  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.Employee)
  JobHistories: JobHistory[];

  @ManyToOne(() => Location, (location) => location.Departments)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'locationId' }])
  Location: Location;

  @ManyToOne(() => Employee, (employee) => employee.ManagedDepartments)
  @JoinColumn([{ name: 'manager_id', referencedColumnName: 'employeeId' }])
  Manager: Employee;
}
