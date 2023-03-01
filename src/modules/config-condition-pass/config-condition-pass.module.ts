import { Module } from '@nestjs/common';
import { ConfigConditionPassController } from './config-condition-pass.controller';
import { ConfigConditionPassService } from './config-condition-pass.service';

@Module({
  controllers: [ConfigConditionPassController],
  providers: [ConfigConditionPassService],
})
export class ConfigConditionPassModule {}
