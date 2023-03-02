import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MgtTrainningPointController } from './mgt-trainning-point.controller';
import { MgtTrainningPointService } from './mgt-trainning-point.service';
import {
  TranningPoints,
  TranningPointSchema,
} from './schemas/study-process.trainningPoint.schema';
import {
  VolunteePrograms,
  VolunteeProgramsSchema,
} from './schemas/study-process.voluntee-program.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TranningPoints.name,
        schema: TranningPointSchema,
      },
      {
        name: VolunteePrograms.name,
        schema: VolunteeProgramsSchema,
      },
    ]),
  ],
  controllers: [MgtTrainningPointController],
  providers: [MgtTrainningPointService],
})
export class MgtTrainningPointModule {}
