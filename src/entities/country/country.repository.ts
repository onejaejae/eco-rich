import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Country } from './country.entity';
import { ICountryRepository } from './country-repository.interface';

@Injectable()
export class CountryRepository
  extends GenericTypeOrmRepository<Country>
  implements ICountryRepository
{
  constructor(protected readonly txManager: TransactionManager) {
    super(Country);
  }

  getName(): EntityTarget<Country> {
    return Country.name;
  }
}
