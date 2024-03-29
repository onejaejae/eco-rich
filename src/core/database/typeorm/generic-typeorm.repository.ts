import { BadRequestException, Injectable } from '@nestjs/common';
import {
  EntityTarget,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { RootEntity } from './root.entity';
import { TransactionManager } from './transaction.manager';
import { GenericRepository } from '../generic/generic.repository';

@Injectable()
export abstract class GenericTypeOrmRepository<T extends RootEntity>
  implements GenericRepository<T>
{
  protected abstract readonly txManager: TransactionManager;
  constructor(private readonly classType: ClassConstructor<T>) {}

  abstract getName(): EntityTarget<T>;

  async findOneOrThrow(filters: Partial<T>): Promise<T> {
    const findOption: FindOneOptions = { where: filters };
    const res = await this.getRepository().findOne(findOption);

    if (!res) {
      let msgList = [];
      for (let [key, value] of Object.entries(filters)) {
        msgList.push(`${key}: ${value}`);
      }
      throw new BadRequestException(`don't exist ${msgList.join(', ')}`);
    }

    return plainToInstance(this.classType, res);
  }

  async update(entity: T): Promise<T> {
    const res = await this.getRepository().save(entity);

    return plainToInstance(this.classType, res);
  }

  async updateMany(entities: T[]): Promise<T[]> {
    const results = await this.getRepository().save(entities);

    return results.map((res) => plainToInstance(this.classType, res));
  }

  async createEntity(model: T): Promise<T> {
    const res = await this.getRepository().save(model);
    return plainToInstance(this.classType, res);
  }

  async deleteById(id: number) {
    await this.getRepository().softDelete(id);
  }

  protected getRepository(): Repository<T> {
    return this.txManager.getEntityManager().getRepository(this.getName());
  }

  protected getQueryBuilder(): SelectQueryBuilder<T> {
    return this.txManager
      .getEntityManager()
      .getRepository(this.getName())
      .createQueryBuilder(String(this.getName()).toLowerCase());
  }
}
