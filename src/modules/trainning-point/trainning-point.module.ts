import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbConnection } from 'src/constants/constants.dB.mongo.connection';
import { MgtTrainningPointController } from './trainning-point.controller';
import { TrainningPointService } from './trainning-point.service';
import {
  TrainningPoints,
  TranningPointSchema,
} from './schemas/trainning-point.schema';
import {
  VolunteePrograms,
  VolunteeProgramsSchema,
} from './schemas/trainning-point.voluntee-program.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TrainningPoints.name,
        schema: TranningPointSchema,
      },
      {
        name: VolunteePrograms.name,
        schema: VolunteeProgramsSchema,
      },
    ]),
  ],
  controllers: [MgtTrainningPointController],
  providers: [TrainningPointService, DbConnection],
})
export class TrainningPointModule {}
