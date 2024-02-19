import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { Job } from './job.entity';

export const JobRepositoryKey = 'JobRepositoryKey';

export interface IJobRepository extends GenericRepository<Job> {}
