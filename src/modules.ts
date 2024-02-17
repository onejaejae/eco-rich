import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { CountryModule } from './modules/country/country.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { JobModule } from './modules/job/job.module';
import { JobHistoryModule } from './modules/job-history/job-history.module';
import { LocationModule } from './modules/location/location.module';
import { RegionModule } from './modules/region/region.module';

const applicationModules = [
  CountryModule,
  DepartmentModule,
  EmployeeModule,
  JobModule,
  JobHistoryModule,
  LocationModule,
  RegionModule,
];

@Module({
  imports: [CoreModule, ...applicationModules],
  controllers: [],
  providers: [],
})
export class Modules {}
