import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbConnection } from 'src/constants/dBConnection';
import { MgtTrainningPointController } from './mgt-trainning-point.controller';
import { MgtTrainningPointService } from './mgt-trainning-point.service';
import {
  Trainning_Points,
  TranningPointSchema,
} from './schemas/study-process.trainningPoint.schema';
import {
  Voluntee_Programs,
  VolunteeProgramsSchema,
} from './schemas/study-process.voluntee-program.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Trainning_Points.name,
        schema: TranningPointSchema,
      },
      {
        name: Voluntee_Programs.name,
        schema: VolunteeProgramsSchema,
      },
    ]),
  ],
  controllers: [MgtTrainningPointController],
  providers: [MgtTrainningPointService, DbConnection],
})
export class MgtTrainningPointModule {}
