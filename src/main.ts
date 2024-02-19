import { NestFactory } from '@nestjs/core';
import { Modules } from './modules';
import { setNestApp } from 'setNestApp';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EcoConfigService } from './core/config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(Modules);

  const configService = app.get(EcoConfigService);
  const appConfig = configService.getAppConfig();

  setNestApp(app);

  await app.listen(appConfig.PORT);
  Logger.log(`😇 [ECO&RICH -API][${appConfig.ENV}] Started at: ${Date.now()}`);
  Logger.log(`🚀 Server open at ${appConfig.BASE_URL}:${appConfig.PORT}`);
}
bootstrap();
