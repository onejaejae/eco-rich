import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { CountryModule } from './modules/country/country.module';

const applicationModules = [CountryModule];

@Module({
  imports: [CoreModule, ...applicationModules],
  controllers: [],
  providers: [],
})
export class Modules {}
