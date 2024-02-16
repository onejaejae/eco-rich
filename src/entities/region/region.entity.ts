import { BaseEntity } from 'src/core/database/typeorm/base.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('regions')
export class Region extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  regionId: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  regionName: string;
}
