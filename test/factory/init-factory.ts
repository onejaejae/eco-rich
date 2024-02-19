import { ClassConstructor } from 'class-transformer';
import { BaseTimeEntity } from 'src/core/database/typeorm/baseTime.entity';
import { Country } from 'src/entities/country/country.entity';
import { Department } from 'src/entities/department/department.entity';
import { Employee } from 'src/entities/employee/employee.entity';
import { JobHistory } from 'src/entities/job-history/job-history.entity';
import { Job } from 'src/entities/job/job.entity';
import { Location } from 'src/entities/location/location.entity';
import { Region } from 'src/entities/region/region.entity';
import { DataSource, QueryRunner } from 'typeorm';

export class InitFactory {
  private async insertData(
    queryRunner: QueryRunner,
    entity: ClassConstructor<BaseTimeEntity>,
    data: any[],
  ): Promise<void> {
    const entityInstance = queryRunner.manager.getRepository(entity);
    await entityInstance.insert(data);
  }

  async run(dataSource: DataSource): Promise<void> {
    const regionList = [{ regionId: 1, regionName: 'Europe' }];

    const countryList = [
      { countryId: 'IT', countryName: 'Italy', regionId: 1 },
    ];

    const locationList = [
      {
        locationId: 1000,
        streetAddress: '1297 Via Cola di Rie',
        postalCode: '00989',
        city: 'Roma',
        stateProvince: null,
        countryId: 'IT',
      },
    ];

    const departmentList = [
      {
        departmentId: 10,
        departmentName: 'Administration',
        managerId: null,
        locationId: 1000,
      },
    ];

    const jobList = [
      {
        jobId: 'AD_PRES',
        jobTitle: 'President',
        minSalary: 20000,
        maxSalary: 40000,
      },
    ];

    const employeeList = [
      {
        employeeId: 100,
        firstName: 'Steven',
        lastName: 'King',
        email: 'SKING',
        phoneNumber: '515.123.4567',
        hireDate: new Date('1987-06-17'),
        jobId: 'AD_PRES',
        salary: 24000,
        commissionPct: null,
        managerId: null,
        departmentId: 10,
      },
    ];

    const jobHistoryList = [
      {
        employeeId: 100,
        startDate: '13-Jan-1993',
        endDate: '24-Jul-1998',
        jobId: 'AD_PRES',
        departmentId: 10,
      },
    ];

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await this.insertData(queryRunner, Region, regionList);
      await this.insertData(queryRunner, Country, countryList);
      await this.insertData(queryRunner, Location, locationList);
      await this.insertData(queryRunner, Department, departmentList);
      await this.insertData(queryRunner, Job, jobList);
      await this.insertData(queryRunner, Employee, employeeList);
      await this.insertData(queryRunner, JobHistory, jobHistoryList);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async down(dataSource: DataSource) {
    await dataSource.query('TRUNCATE TABLE regions CASCADE;');
    await dataSource.query('TRUNCATE TABLE countries CASCADE;');
    await dataSource.query('TRUNCATE TABLE locations CASCADE;');
    await dataSource.query('TRUNCATE TABLE departments CASCADE;');
    await dataSource.query('TRUNCATE TABLE jobs CASCADE;');
    await dataSource.query('TRUNCATE TABLE employees CASCADE;');
    await dataSource.query('TRUNCATE TABLE job_history CASCADE;');
  }
}
