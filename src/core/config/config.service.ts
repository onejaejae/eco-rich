import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, Configurations, DBConfig, OpenAPiConfig } from '.';

@Injectable()
export class EcoConfigService {
  constructor(private readonly configService: ConfigService<Configurations>) {}

  getAppConfig(): AppConfig {
    return this.configService.getOrThrow('APP');
  }

  getDBConfig(): DBConfig {
    return this.configService.getOrThrow('DB');
  }

  getOpenApiConfig(): OpenAPiConfig {
    return this.configService.getOrThrow('OPEN_API');
  }
}
