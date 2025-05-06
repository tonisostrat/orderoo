import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Config } from './infra';

void (async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);

  const { port } = configService.getOrThrow<Config.Server>('server');

  await app.listen(port);
})();
