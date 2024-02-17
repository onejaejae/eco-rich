import { BaseTimeEntity } from 'src/core/database/typeorm/baseTime.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Country } from '../country/country.entity';
import { Department } from '../department/department.entity';

@Entity('locations')
export class Location extends BaseTimeEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  locationId: number;

  @Column({ type: 'varchar', length: 40 })
  streetAddress: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  postalCode: string;

  @Column({ type: 'varchar', length: 30 })
  city: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  stateProvince: string;

  @Column({ type: 'varchar', length: 2 })
  countryId: string;

  @OneToMany(() => Department, (department) => department.Location)
  Departments: Department[];

  @ManyToOne(() => Country, (country) => country.Locations)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'countryId' }])
  Country: Country;
}
