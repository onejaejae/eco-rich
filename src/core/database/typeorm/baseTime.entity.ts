import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { RootEntity } from './root.entity';
export abstract class BaseTimeEntity extends RootEntity {
  @CreateDateColumn({
    nullable: false,
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamptz',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
    type: 'timestamptz',
  })
  deletedAt: Date | null;
}
