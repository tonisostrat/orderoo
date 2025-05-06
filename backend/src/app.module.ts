import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CurrenciesModule, OrdersModule } from './modules';
import {
  PersistenceErrorFilter,
  UnknownRouteFilter,
  ValidationErrorFilter,
} from './infra/filters';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config, Config } from './infra';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: UnknownRouteFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PersistenceErrorFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<Config.Database>('database'),
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    CurrenciesModule,
    OrdersModule,
  ],
})
export class AppModule {}
