import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { StudyProcessModule } from './modules/study-process/study-process.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigsModule } from './modules/configs/configs.module';
import { TrainningPointModule } from './modules/trainning-point/trainning-point.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'src/public'),
    }),
    AuthModule,
    StudyProcessModule,
    TrainningPointModule,
    ConfigsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
