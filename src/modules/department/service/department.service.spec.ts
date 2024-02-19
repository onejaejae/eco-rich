import { Namespace, createNamespace, destroyNamespace } from 'cls-hooked';
import { DataSource } from 'typeorm';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import {
  ECO_ENTITY_MANAGER,
  ECO_NAMESPACE,
} from 'src/common/constant/nameSpace';
import { BadRequestException } from '@nestjs/common';
import { EmployeeRepository } from 'src/entities/employee/employee.repository';
import { InitFactory } from 'test/factory/init-factory';
import { Region } from 'src/entities/region/region.entity';
import { Country } from 'src/entities/country/country.entity';
import { Location } from 'src/entities/location/location.entity';
import { Department } from 'src/entities/department/department.entity';
import { Job } from 'src/entities/job/job.entity';
import { Employee } from 'src/entities/employee/employee.entity';
import { JobHistory } from 'src/entities/job-history/job-history.entity';
import { DatabaseModule } from 'test/db.module';
import { IDepartmentService } from './department-service.interface';
import { DepartmentRepository } from 'src/entities/department/department.repository';
import { DepartmentService } from './department.service';
import { UpdateDepartmentSalaryDto } from 'src/common/request/department/update-department-salary.dto';

describe('department service test', () => {
  // for testContainers
  jest.setTimeout(300_000);

  let dataSource: DataSource;
  let service: IDepartmentService;
  let namespace: Namespace;
  let initFactory: InitFactory;

  beforeAll(async () => {
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
    const departmentRepository = new DepartmentRepository(txManager);
    const employeeRepository = new EmployeeRepository(txManager);

    service = new DepartmentService(departmentRepository, employeeRepository);
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
    await dataSource.destroy();
  });

  it('Should be defined', () => {
    expect(dataSource).toBeDefined();
    expect(namespace).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getDepartmentDetail', () => {
    it('department가 존재하지 않는 경우 - 실패', async () => {
      //given
      const unExistDepartmentId = 300;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(ECO_ENTITY_MANAGER, dataSource.createEntityManager());
          await service.getDepartmentDetail(unExistDepartmentId);
        }),
      ).rejects.toThrow(
        new BadRequestException(
          `don't exist departmentId: ${unExistDepartmentId}`,
        ),
      );
    });

    it('deaprtment 존재하는 경우 - 성공', async () => {
      //given
      await initFactory.run(dataSource);
      const departmentId = 10;

      //when
      const res = await namespace.runPromise(async () => {
        namespace.set(ECO_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.getDepartmentDetail(departmentId);
      });

      //then
      expect(res.Location).toBeDefined();
      expect(res.Location.Country).toBeDefined();
      expect(res.Location.Country.Region).toBeDefined();
    });
  });

  describe('updateDepartmentSalary', () => {
    it('department가 존재하지 않는 경우 - 실패', async () => {
      //given
      const unExistDepartmentId = 300;

      //when
      //then
      await expect(
        namespace.runPromise(async () => {
          namespace.set(ECO_ENTITY_MANAGER, dataSource.createEntityManager());
          await service.getDepartmentDetail(unExistDepartmentId);
        }),
      ).rejects.toThrow(
        new BadRequestException(
          `don't exist departmentId: ${unExistDepartmentId}`,
        ),
      );
    });

    it('특정 부서의 급여를 특정 비율로 인상 및 사원 정보 업데이트  - 성공', async () => {
      //given
      await initFactory.run(dataSource);
      const beforeSalary = 24000;
      const departmentId = 10;
      const updateDepartmentSalaryDto = new UpdateDepartmentSalaryDto();
      updateDepartmentSalaryDto.increaseRate = 0.5;

      //when
      const res = await namespace.runPromise(async () => {
        namespace.set(ECO_ENTITY_MANAGER, dataSource.createEntityManager());
        return service.updateDepartmentSalary(
          departmentId,
          updateDepartmentSalaryDto,
        );
      });

      //then
      expect(res[0].salary).not.toBe(beforeSalary);
      expect(beforeSalary * (1 + updateDepartmentSalaryDto.increaseRate)).toBe(
        res[0].salary,
      );
    });
  });
});
