import { ClassProvider, Module } from '@nestjs/common';
import { RegionRepository } from './region.repository';
import { RegionRepositoryKey } from './region-repository.interface';

export const regionRepository: ClassProvider = {
  provide: RegionRepositoryKey,
  useClass: RegionRepository,
};
@Module({
  providers: [regionRepository],
  exports: [regionRepository],
})
export class RegionRepositoryModule {}
