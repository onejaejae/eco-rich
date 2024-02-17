import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Location } from './location.entity';

@Injectable()
export class LocationRepository extends GenericTypeOrmRepository<Location> {
  constructor(protected readonly txManager: TransactionManager) {
    super(Location);
  }

  getName(): EntityTarget<Location> {
    return Location.name;
  }
}
