import { InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import {
  ECO_NAMESPACE,
  ECO_ENTITY_MANAGER,
} from 'src/common/constant/nameSpace';
import { EntityManager } from 'typeorm';

export function Transactional() {
  return function (
    _target: Object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    // save original method
    const originMethod = descriptor.value;

    // wrapped origin method with Transaction
    async function transactionWrapped(...args: unknown[]) {
      // validate nameSpace && get nameSpace
      const nameSpace = getNamespace(ECO_NAMESPACE);
      if (!nameSpace || !nameSpace.active)
        throw new InternalServerErrorException(
          `${ECO_NAMESPACE} is not active`,
        );

      // get EntityManager
      const em = nameSpace.get(ECO_ENTITY_MANAGER) as EntityManager;
      if (!em)
        throw new InternalServerErrorException(
          `Could not find EntityManager in ${ECO_NAMESPACE} nameSpace`,
        );

      return await em.transaction(
        process.env.NODE_ENV !== 'test' ? 'REPEATABLE READ' : 'SERIALIZABLE',
        async (tx: EntityManager) => {
          nameSpace.set(ECO_ENTITY_MANAGER, tx);
          return await originMethod.apply(this, args);
        },
      );
    }

    descriptor.value = transactionWrapped;
  };
}
