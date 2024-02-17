import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EcoConfigModule } from './config/config.module';
import { getTypeOrmModule } from './database/typeorm/typeorm.module';
import { TransactionMiddleware } from './middleware/transaction.middleware';
import { TransactionManager } from './database/typeorm/transaction.manager';

const modules = [EcoConfigModule];
const providers = [TransactionManager];

@Global()
@Module({
  imports: [getTypeOrmModule(), ...modules],
  providers: [...providers],
  exports: [...modules, ...providers],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
