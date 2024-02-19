import { Namespace, createNamespace, destroyNamespace } from 'cls-hooked';
import { DataSource } from 'typeorm';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import {
  ECO_ENTITY_MANAGER,
  ECO_NAMESPACE,
} from 'src/common/constant/nameSpace';
import { BadRequestException } from '@nestjs/common';
import { IEmployeeService } from '../service/employee-service.interface';
import { EmployeeRepository } from 'src/entities/employee/employee.repository';
import { EmployeeService } from '../service/employee.service';
import { InitFactory } from 'test/factory/init-factory';
import { Region } from 'src/entities/region/region.entity';
import { Country } from 'src/entities/country/country.entity';
import { Location } from 'src/entities/location/location.entity';
import { Department } from 'src/entities/department/department.entity';
import { Job } from 'src/entities/job/job.entity';
import { Employee } from 'src/entities/employee/employee.entity';
import { JobHistory } from 'src/entities/job-history/job-history.entity';
import { DatabaseModule } from 'test/db.module';

describe('employee service test', () => {
  // for testContainers
  jest.setTimeout(300_000);

  let container: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let service: IEmployeeService;
  let namespace: Namespace;
  let initFactory: InitFactory;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    dataSource = await DatabaseModule([
      Region,
      Country,
      Location,
      Department,
      Job,
      Employee,
      JobHistory,
    ]);

    const txManager = new TransactionManager();
    const employeeRepository = new EmployeeRepository(txManager);
    service = new EmployeeService(employeeRepository);
    initFactory = new InitFactory();
  });

  beforeEach(async () => {
    namespace = createNamespace(ECO_NAMESPACE);
  });

  afterEach(async () => {
    await initFactory.down(dataSource);
    destroyNamespace(ECO_NAMESPACE);
  });

  afterAll(async () => {
    await container.stop();
    await dataSource.destroy();
  });

  it('Should be defined', () => {
    expect(dataSource).toBeDefined();
    expect(namespace).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getEmployee', () => {
    it('Employee가 존재하지 않는 경우 - 실패', async () => {
      //given
      const unExistEmployeeId = 300;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(ECO_ENTITY_MANAGER, dataSource.createEntityManager());
          await service.getEmployee(unExistEmployeeId);
        }),
      ).rejects.toThrow(
        new BadRequestException(`don't exist employeeId: ${unExistEmployeeId}`),
      );
    });

    it('Employee가 존재하는 경우 - 성공', async () => {
      //given
      await initFactory.run(dataSource);
      const employeeId = 100;

      //when

      const res = await namespace.runPromise(async () => {
        namespace.set(ECO_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.getEmployee(employeeId);
      });

      //then
      expect(res.Department).toBeDefined();
      expect(res.Job).toBeDefined();
      expect(res.ManagedEmployees).toBeDefined();
      expect(res.ManagedDepartments).toBeDefined();
      expect(res.Manager).toBeDefined();
    });
  });

  describe('getEmployeeJobHistory', () => {
    it('Employee가 존재하지 않는 경우 - 실패', async () => {
      //given
      const unExistEmployeeId = 300;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(ECO_ENTITY_MANAGER, dataSource.createEntityManager());
          await service.getEmployeeJobHistory(unExistEmployeeId);
        }),
      ).rejects.toThrow(
        new BadRequestException(`don't exist employeeId: ${unExistEmployeeId}`),
      );
    });

    it('Employee가 존재하는 경우 - 성공', async () => {
      //given
      await initFactory.run(dataSource);
      const employeeId = 100;

      //when

      const res = await namespace.runPromise(async () => {
        namespace.set(ECO_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.getEmployeeJobHistory(employeeId);
      });

      //then
      expect(res.JobHistories).toBeDefined();
      expect(res.JobHistories[0].Job).toBeDefined();
      expect(res.JobHistories[0].Department).toBeDefined();
    });
  });
});
