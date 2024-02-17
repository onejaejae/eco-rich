import { Module } from '@nestjs/common';
import { RegionRepository } from './region.repository';

@Module({
  providers: [RegionRepository],
  exports: [RegionRepository],
})
export class RegionRepositoryModule {}
