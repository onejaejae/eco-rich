import { BaseTimeEntity } from 'src/core/database/typeorm/baseTime.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Region } from '../region/region.entity';

@Entity('countries')
export class Country extends BaseTimeEntity {
  @PrimaryColumn({ type: 'varchar', length: 2 })
  countryId: string;

  @Column({ type: 'varchar', length: 40 })
  countryName: string;

  @Column({ type: 'int', unsigned: true })
  regionId: number;

  @ManyToOne(() => Region, (region) => region.Countries, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'region_id', referencedColumnName: 'regionId' }])
  region: Region;
}
