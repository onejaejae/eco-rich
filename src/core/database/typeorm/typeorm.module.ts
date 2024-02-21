import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule as OrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EcoConfigModule } from 'src/core/config/config.module';
import { EcoConfigService } from 'src/core/config/config.service';

const entityPath = path.join(__dirname + './../../../entities/*/*.entity.js');
export class TypeOrmModule {
  static forRoot(): DynamicModule {
    return OrmModule.forRootAsync({
      imports: [EcoConfigModule],
      inject: [EcoConfigService],
      useFactory: async (configService: EcoConfigService) => {
        const dbConfig = configService.getDBConfig();
        const appCongig = configService.getAppConfig();

        console.log('OPEN_API_ACCESS_KEY', process.env.OPEN_API_ACCESS_KEY);

        return {
          type: 'postgres',
          host: appCongig.ENV === 'local' ? 'localhost' : dbConfig.DB_HOST,
          port: Number(dbConfig.DB_PORT),
          database: dbConfig.DB_DATABASE,
          username: dbConfig.DB_USER_NAME,
          password: dbConfig.DB_PASSWORD,
          synchronize: false,
          entities: [entityPath],
          logging: false,
          namingStrategy: new SnakeNamingStrategy(),
          extra: {
            max: 10,
          },
        };
      },
    });
  }
}

export const getTypeOrmModule = (): DynamicModule => {
  return TypeOrmModule.forRoot();
};
