import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Region } from './region.entity';
import { IRegionRepository } from './region-repository.interface';

@Injectable()
export class RegionRepository
  extends GenericTypeOrmRepository<Region>
  implements IRegionRepository
{
  constructor(protected readonly txManager: TransactionManager) {
    super(Region);
  }

  getName(): EntityTarget<Region> {
    return Region.name;
  }
}
