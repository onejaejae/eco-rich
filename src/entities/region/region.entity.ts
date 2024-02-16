import { BaseTimeEntity } from 'src/core/database/typeorm/baseTime.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Country } from '../country/country.entity';

@Entity('regions')
export class Region extends BaseTimeEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  regionId: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  regionName: string;

  @OneToMany(() => Country, (country) => country.Region)
  Countries: Country[];
}
