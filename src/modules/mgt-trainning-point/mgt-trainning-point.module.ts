import { Module } from '@nestjs/common';
import { MgtTrainningPointController } from './mgt-trainning-point.controller';
import { MgtTrainningPointService } from './mgt-trainning-point.service';

@Module({
  controllers: [MgtTrainningPointController],
  providers: [MgtTrainningPointService],
})
export class MgtTrainningPointModule {}
