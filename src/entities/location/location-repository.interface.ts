import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { Location } from './location.entity';

export const LocationRepositoryKey = 'LocationRepositoryKey';

export interface ILocationRepository extends GenericRepository<Location> {}
