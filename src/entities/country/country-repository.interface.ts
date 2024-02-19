import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { Country } from './country.entity';

export const CountryRepositoryKey = 'CountryRepositoryKey';

export interface ICountryRepository extends GenericRepository<Country> {}
