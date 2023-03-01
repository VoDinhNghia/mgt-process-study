import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { ValidateField } from 'src/abstracts/validateFieldById';
import {
  EtypeConfigCoditionPassSubject,
  EtypeStatusSubjectStudy,
} from 'src/commons/constants';
import { DbConnection } from 'src/commons/dBConnection';
import {
  ConfigConditionPassSubject,
  ConfigConditionPassSubjectDocument,
} from '../config-condition-pass/schemas/config.condition-pass.schema';
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
    @InjectModel(ConfigConditionPassSubject.name)
    private readonly configSchema: Model<ConfigConditionPassSubjectDocument>,
    private readonly db: DbConnection,
    private readonly validate: ValidateField,
  ) {}

  async createSubjectRegister(
    subjectDto: CreateStudySubjectProcessDto,
  ): Promise<SubjectRegisters> {
    const { subject, studyprocess } = subjectDto;
    const studyProcess = await this.db
      .collection('studyprocesses')
      .findOne({ _id: new Types.ObjectId(studyprocess) });
    if (!studyProcess) {
      new CommonException(404, 'User study process not found.');
    }
    await this.validateSubject(subject, studyprocess);
    const newDocument = await new this.subjectSchema(subjectDto).save();
    const result = await this.findSubjectRegisterById(newDocument._id);
    return result;
  }

  async updatePointSubject(
    id: string,
    subjectDto: UpdateStudySubjectProcessDto,
  ): Promise<SubjectRegisters> {
    const subjectRegister = await this.subjectSchema.findById(id);
    if (!subjectRegister) {
      new CommonException(404, 'Subject register not found.');
    }
    if (subjectRegister.accumalatedPoint && subjectRegister.status) {
      new CommonException(
        403,
        'You are permission edit points, please contact with admin to edit.',
      );
    }
    const dto: Record<string, any> = subjectDto;
    if (subjectDto.finalScore) {
      const conditionAccumlatedPoint = await this.findConditionPassSubject(
        EtypeConfigCoditionPassSubject.ACCUMULATED_POINT,
      );
      const conditionFinalPoint = await this.findConditionPassSubject(
        EtypeConfigCoditionPassSubject.FINAL_EXAM_POINT,
      );
      let accumalatedPoint = 0;
      if (subjectDto.finalScore < conditionFinalPoint) {
        accumalatedPoint = subjectDto.finalScore;
      } else {
        accumalatedPoint = await this.calculateAccumulatedPoint(
          subjectRegister.subject,
          subjectDto,
        );
      }
      dto.accumalatedPoint = accumalatedPoint;
      if (accumalatedPoint >= conditionAccumlatedPoint) {
        dto.status = EtypeStatusSubjectStudy.PASS;
      } else {
        dto.status = EtypeStatusSubjectStudy.FAILED;
      }
    }
    await this.subjectSchema.findByIdAndUpdate(id, dto);
    const result = await this.findSubjectRegisterById(id);
    return result;
  }

  async findConditionPassSubject(type: string): Promise<number> {
    const result = await this.configSchema.findOne({ type });
    if (!result) {
      new CommonException(404, 'Config not found.');
    }
    return result.condition;
  }

  async findSubjectRegisterById(id: string): Promise<SubjectRegisters> {
    const agg = [{ $match: { _id: new Types.ObjectId(id) } }];
    const aggregate = this.lookupCommon(agg);
    const result = await this.subjectSchema.aggregate(aggregate);
    if (!result[0]) {
      new CommonException(404, 'Subject register not found.');
    }
    return result[0];
  }

  async calculateAccumulatedPoint(
    subjectId: ObjectId | any,
    subjectPointsDto: UpdateStudySubjectProcessDto,
  ) {
    const cursorAgg = await this.db.collection('subjects').aggregate([
      { $match: { _id: subjectId } },
      {
        $lookup: {
          from: 'subjectprocesses',
          localField: '_id',
          foreignField: 'subject',
          as: 'process',
        },
      },
      { $unwind: '$process' },
    ]);
    const subjectInfo = await cursorAgg?.toArray();
    const { midTermTest, finalExam, studentEssay } =
      subjectInfo[0].process ?? {};
    const pointMid =
      (midTermTest.percent * (subjectPointsDto.midtermScore || 0)) / 100;
    const pointEsasy =
      (studentEssay.percent * (subjectPointsDto.essayCore || 0)) / 100;
    const pointFinal = (finalExam.percent * subjectPointsDto.finalScore) / 100;
    const accumalatedPoint = pointEsasy + pointFinal + pointMid;
    return accumalatedPoint;
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

  lookupCommon(agg = []) {
    const aggregate = [
      ...agg,
      {
        $lookup: {
          from: 'subjects',
          localField: 'subject',
          foreignField: '_id',
          as: 'subject',
        },
      },
      { $unwind: '$subject' },
      {
        $lookup: {
          from: 'studyprocesses',
          localField: 'studyprocess',
          foreignField: '_id',
          as: 'studyprocess',
        },
      },
      { $unwind: '$studyprocess' },
    ];
    return aggregate;
  }
}
