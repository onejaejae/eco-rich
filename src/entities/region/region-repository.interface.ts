import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { Region } from './region.entity';

export const RegionRepositoryKey = 'RegionRepositoryKey';

export interface IRegionRepository extends GenericRepository<Region> {}
