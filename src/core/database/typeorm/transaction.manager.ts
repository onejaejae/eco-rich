import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import {
  ECO_ENTITY_MANAGER,
  ECO_NAMESPACE,
} from 'src/common/constant/nameSpace';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionManager {
  getEntityManager(): EntityManager {
    const nameSpace = getNamespace(ECO_NAMESPACE);
    if (!nameSpace || !nameSpace.active)
      throw new InternalServerErrorException(`${ECO_NAMESPACE} is not active`);
    return nameSpace.get(ECO_ENTITY_MANAGER);
  }
}
