import { RootEntity } from '../typeorm/root.entity';

export interface GenericRepository<T extends RootEntity> {
  findOneOrThrow(filters: Partial<T>): Promise<T>;
  createEntity(model: T): Promise<T>;
  update(entity: T): Promise<T>;
  updateMany(entities: T[]): Promise<T[]>;
  deleteById(id: number): Promise<void>;
}
