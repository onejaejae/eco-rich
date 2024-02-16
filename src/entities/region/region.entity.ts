import { BaseEntity } from 'src/core/database/typeorm/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('regions')
export class Region extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  regionId: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  regionName: string;
}
