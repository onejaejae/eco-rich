import { Module } from '@nestjs/common';
import { CountryRepositoryModule } from 'src/entities/country/country-repository.module';

@Module({
  imports: [CountryRepositoryModule],
  controllers: [],
  providers: [],
})
export class CountryModule {}
