import { ClassProvider, Module } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { CountryRepositoryKey } from './country-repository.interface';

export const countryRepository: ClassProvider = {
  provide: CountryRepositoryKey,
  useClass: CountryRepository,
};

@Module({
  providers: [countryRepository],
  exports: [countryRepository],
})
export class CountryRepositoryModule {}
