import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { ValidateField } from 'src/abstracts/validateFieldById';
import { DbConnection } from 'src/commons/dBConnection';
import { CreateStudyProcessDto } from './dtos/study-process.create.dto';
import { CreateStudySubjectProcessDto } from './dtos/study-process.subject.dto';
import {
  StudyProcess,
  StudyProcessDocument,
} from './schemas/study-process.schema';
import {
  SubjectRegisterDocument,
  SubjectRegisters,
} from './schemas/study-process.subject.schema';

@Injectable()
export class StudyProcessService {
  constructor(
    @InjectModel(StudyProcess.name)
    private readonly studyProcessSchema: Model<StudyProcessDocument>,
    @InjectModel(SubjectRegisters.name)
    private readonly subjectSchema: Model<SubjectRegisterDocument>,
    private readonly db: DbConnection,
    private readonly validate: ValidateField,
  ) {}

  async createStudyProcess(
    studyProcessDto: CreateStudyProcessDto,
  ): Promise<StudyProcess> {
    const { user } = studyProcessDto;
    const options = { user: new Types.ObjectId(user) };
    const checkProfile = await this.db.collection('profiles').findOne({
      _id: new Types.ObjectId(user),
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

  async validateSubject(subjectId: string): Promise<void> {
    const subjectInfo = await this.db
      .collection('subjects')
      .findOne({ _id: new Types.ObjectId(subjectId), status: true });
    if (!subjectInfo) {
      new CommonException(404, 'Subject not found.');
    }
    const getAllRegister = await this.subjectSchema.find({
      subject: new Types.ObjectId(subjectId),
    });
    if (subjectInfo.size <= getAllRegister.length) {
      new CommonException(400, 'Sufficient number of students have registered');
    }
  }

  async createSubjectRegister(
    subjectDto: CreateStudySubjectProcessDto,
  ): Promise<SubjectRegisters> {
    await this.validateSubject(subjectDto.subject);
    const result = await new this.subjectSchema(subjectDto).save();
    return result;
  }

  calculateAccumulatedPoint(point: number, percent: number) {
    const accumulatedPoint = (point * percent) / 100;
    return accumulatedPoint;
  }
}
