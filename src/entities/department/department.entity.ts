import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from '../location/location.entity';

@Entity('departments')
export class Department {
  @PrimaryColumn({ type: 'int', unsigned: true })
  departmentId: number;

  @Column({ type: 'varchar', length: 30 })
  departmentName: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  locationId: number;

  @ManyToOne(() => Location, (location) => location.Departments)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'locationId' }])
  Location: Location;
}
