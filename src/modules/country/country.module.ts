import { Module } from '@nestjs/common';
import { CountryRepositoryModule } from 'src/entities/country/country.repository';

@Module({
  imports: [CountryRepositoryModule],
  controllers: [],
  providers: [],
})
export class CountryModule {}
