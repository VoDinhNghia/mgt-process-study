import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { DbConnection } from 'src/commons/dBConnection';
import { CreateStudyProcessDto } from './dtos/study-process.create.dto';
import {
  StudyProcess,
  StudyProcessDocument,
} from './schemas/study-process.schema';

@Injectable()
export class StudyProcessService {
  constructor(
    @InjectModel(StudyProcess.name)
    private readonly studyProcessSchema: Model<StudyProcessDocument>,
    private readonly db: DbConnection,
  ) {}

  async createStudyProcess(
    studyProcessDto: CreateStudyProcessDto,
  ): Promise<StudyProcess> {
    const { profile } = studyProcessDto;
    const checkProfile = await this.db.collection('profiles').findOne({
      _id: new Types.ObjectId(profile),
    });
    if (!checkProfile) {
      new CommonException(404, 'Profile not found');
    }
    const existed = await this.studyProcessSchema.findOne({
      profile: new Types.ObjectId(profile),
    });
    if (existed) {
      new CommonException(409, 'User study process existed already.');
    }
    const result = await new this.studyProcessSchema(studyProcessDto).save();
    return result;
  }
}
