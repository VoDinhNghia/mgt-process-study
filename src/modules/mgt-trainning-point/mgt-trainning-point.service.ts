import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TranningPoints,
  TranningPointsDocument,
} from './schemas/study-process.trainningPoint.schema';
import {
  VolunteePrograms,
  VolunteeProgramsDocument,
} from './schemas/study-process.voluntee-program.schema';

@Injectable()
export class MgtTrainningPointService {
  constructor(
    @InjectModel(TranningPoints.name)
    private readonly trainningPointSchema: Model<TranningPointsDocument>,
    @InjectModel(VolunteePrograms.name)
    private readonly volunteeProgramSchema: Model<VolunteeProgramsDocument>,
  ) {}
}
