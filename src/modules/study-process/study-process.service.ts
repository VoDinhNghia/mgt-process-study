import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { ValidateField } from 'src/abstracts/validateFieldById';
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
    private readonly validate: ValidateField,
  ) {}

  async createStudyProcess(
    studyProcessDto: CreateStudyProcessDto,
  ): Promise<StudyProcess> {
    const { profile } = studyProcessDto;
    const options = { user: new Types.ObjectId(profile) };
    const checkProfile = await this.db.collection('profiles').findOne({
      _id: new Types.ObjectId(profile),
    });
    if (!checkProfile) {
      new CommonException(404, 'Profile not found');
    }
    await this.validate.existed(
      this.studyProcessSchema,
      options,
      'User study process',
    );
    const result = await new this.studyProcessSchema(studyProcessDto).save();
    return result;
  }

  calculateAccumulatedPoint(point: number, percent: number) {
    const accumulatedPoint = (point * percent) / 100;
    return accumulatedPoint;
  }
  // waiting finish api class and subject to insert data,
  // async scholarshipList() {
  //   const
  // }
}
