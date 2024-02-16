import { Global, Module } from '@nestjs/common';
import { EcoConfigModule } from './config/config.module';
import { getTypeOrmModule } from './database/typeorm/typeorm.module';

const modules = [EcoConfigModule];

@Global()
@Module({
  imports: [getTypeOrmModule(), ...modules],
  providers: [],
  exports: [...modules],
})
export class CoreModule {}
