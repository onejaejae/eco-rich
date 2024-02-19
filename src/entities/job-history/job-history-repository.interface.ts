import { GenericRepository } from 'src/core/database/generic/generic.repository';
import { JobHistory } from './job-history.entity';

export const JobHistoryRepositoryKey = 'JobHistoryRepositoryKey';

export interface IJobHistoryRepository extends GenericRepository<JobHistory> {}
