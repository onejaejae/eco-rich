import { ClassProvider, Module } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { LocationRepositoryKey } from './location-repository.interface';

export const locationRepository: ClassProvider = {
  provide: LocationRepositoryKey,
  useClass: LocationRepository,
};
@Module({
  providers: [locationRepository],
  exports: [locationRepository],
})
export class LocationRepositoryModule {}
