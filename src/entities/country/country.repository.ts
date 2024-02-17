import { Module } from '@nestjs/common';
import { CountryRepository } from './country-repository.module';

@Module({
  providers: [CountryRepository],
  exports: [CountryRepository],
})
export class CountryRepositoryModule {}
