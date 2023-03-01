import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigConditionPassController } from './config-condition-pass.controller';
import { ConfigConditionPassService } from './config-condition-pass.service';
import {
  ConfigConditionPassSubject,
  ConfigConditionPassSubjectSchema,
} from './schemas/config.condition-pass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ConfigConditionPassSubject.name,
        schema: ConfigConditionPassSubjectSchema,
      },
    ]),
  ],
  controllers: [ConfigConditionPassController],
  providers: [ConfigConditionPassService],
})
export class ConfigConditionPassModule {}
