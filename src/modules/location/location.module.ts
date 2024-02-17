import { Module } from '@nestjs/common';
import { LocationRepositoryModule } from 'src/entities/location/location-repository.module';

@Module({
  imports: [LocationRepositoryModule],
  controllers: [],
  providers: [],
})
export class LocationModule {}
