import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Study Process Management')
    .setDescription('The Study Process management API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs-study-process', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.enableCors({
    origin: [
      configService.get<string>('ADMIN_FRONTEND'),
      configService.get<string>('FRONTEND'),
      configService.get<string>('LIBRARY_FRONTEND'),
      configService.get<string>('SERVER'),
      configService.get<string>('LIBRARY'),
      configService.get<string>('ATTENDANCE'),
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  });
  await app.listen(3003);
  console.log(`Server running on port ${port}`);
}
(async () => {
  await bootstrap();
})();
