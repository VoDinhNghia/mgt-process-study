import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { ValidateField } from 'src/abstracts/validateFieldById';
import { DbConnection } from 'src/commons/dBConnection';
import { CreateStudySubjectProcessDto } from './dtos/study-process.subject.dto';
import { UpdateStudySubjectProcessDto } from './dtos/study-process.subject.update.dto';
import {
  SubjectRegisterDocument,
  SubjectRegisters,
} from './schemas/study-process.subject.schema';

@Injectable()
export class StudyProcessService {
  constructor(
    @InjectModel(SubjectRegisters.name)
    private readonly subjectSchema: Model<SubjectRegisterDocument>,
    private readonly db: DbConnection,
    private readonly validate: ValidateField,
  ) {}

  async createSubjectRegister(
    subjectDto: CreateStudySubjectProcessDto,
  ): Promise<SubjectRegisters> {
    const { subject, studyprocess } = subjectDto;
    await this.validateSubject(subject, studyprocess);
    const result = await new this.subjectSchema(subjectDto).save();
    return result;
  }

  async updateSubjectRegister(
    id: string,
    subjectDto: UpdateStudySubjectProcessDto,
  ): Promise<SubjectRegisters> {
    const result = await this.subjectSchema.findByIdAndUpdate(id, subjectDto);
    return result;
  }

  calculateAccumulatedPoint(point: number, percent: number) {
    const accumulatedPoint = (point * percent) / 100;
    return accumulatedPoint;
  }

  async validateSubject(
    subjectId: string,
    studyprocess: string,
  ): Promise<void> {
    await this.validateNumberRegister(subjectId);
    const result = await this.subjectSchema.findOne({
      subject: new Types.ObjectId(subjectId),
      studyprocess: new Types.ObjectId(studyprocess),
    });
    if (result) {
      new CommonException(409, 'You have registed this subject already.');
    }
  }

  async findSubjectById(subjectId: string): Promise<Record<string, any>> {
    const result = await this.db
      .collection('subjects')
      .findOne({ _id: new Types.ObjectId(subjectId), status: true });
    if (!result) {
      new CommonException(404, 'Subject not found.');
    }
    return result;
  }

  async validateNumberRegister(subjectId: string): Promise<void> {
    const subjectInfo = await this.findSubjectById(subjectId);
    const getAllRegister = await this.subjectSchema.find({
      subject: new Types.ObjectId(subjectId),
    });
    if (subjectInfo.size <= getAllRegister.length) {
      new CommonException(409, 'Sufficient number of students have registered');
    }
  }
}
