import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configuration';
import { EcoConfigService } from './config.service';
import * as path from 'path';

const envFilePath =
  process.env.NODE_ENV === 'local'
    ? `dotenv/.env.${process.env.NODE_ENV}`
    : `${path.join(__dirname + '../../../.env')}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFilePath],
      load: [configurations],
    }),
  ],
  providers: [EcoConfigService],
  exports: [EcoConfigService],
})
export class EcoConfigModule {}
