import { Module } from '@nestjs/common';
import { RegionRepositoryModule } from 'src/entities/region/region-repository.module';

@Module({
  imports: [RegionRepositoryModule],
  controllers: [],
  providers: [],
})
export class RegionModule {}
