import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EtypeVolunteeProgram } from 'src/constants/constant';
import { DbConnection } from 'src/constants/dBConnection';
import {
  Trainning_Points,
  TranningPointsDocument,
} from './schemas/study-process.trainningPoint.schema';
import {
  Voluntee_Programs,
  VolunteeProgramsDocument,
} from './schemas/study-process.voluntee-program.schema';

@Injectable()
export class MgtTrainningPointService {
  constructor(
    @InjectModel(Trainning_Points.name)
    private readonly trainningPointSchema: Model<TranningPointsDocument>,
    @InjectModel(Voluntee_Programs.name)
    private readonly volunteeProgramSchema: Model<VolunteeProgramsDocument>,
    private readonly db: DbConnection,
  ) {}

  async createTrainningPoint(data = []): Promise<Record<string, any>[]> {
    for (const item of data) {
      const { user, semester, program } = item;
      const userInfo = await this.db
        .collection('profiles')
        .findOne({ _id: new Types.ObjectId(user) });
      if (!userInfo) {
        item.statusCreate = 'Failed - User not found.';
        continue;
      }
      const semesterInfo = await this.db
        .collection('semesters')
        .findOne({ _id: new Types.ObjectId(semester) });
      if (!semesterInfo) {
        item.statusCreate = 'Failed - Semester not found.';
        continue;
      }
      const programInfo = await this.db
        .collection('volunteeprograms')
        .findOne({ _id: new Types.ObjectId(program) });
      if (!programInfo) {
        item.statusCreate = 'Failed - Semester not found.';
        continue;
      }
      item.status = true;
      try {
        await new this.trainningPointSchema(item).save();
        item.statusCreate = 'Success - Create trainning point success.';
      } catch (error) {
        console.log(error);
        item.statusCreate = 'Failed - Can not create trainning point.';
        continue;
      }
    }
    return data;
  }

  async importMultiVolunteeProgram(data = []): Promise<Record<string, any>[]> {
    for (const item of data) {
      const {
        faculty,
        semester,
        type,
        leader,
        secretary,
        title,
        location,
        startDate,
        endDate,
      } = item;
      if (!title || !location || !startDate || !type || !endDate) {
        item.statusCreate =
          'Failed - title or location or startDate or endDate or type not found';
        continue;
      }
      try {
        item.startDate = new Date(startDate);
        item.endDate = new Date(endDate);
      } catch (error) {
        console.log(error);
        item.statusCreate = 'Failed - startDate or endDate incorect format.';
        continue;
      }
      if (faculty) {
        const facultyInfo = await this.db
          .collection('faculties')
          .findOne({ _id: new Types.ObjectId(faculty) });
        if (!facultyInfo) {
          item.statusCreate = 'Failed - faculty not found';
          continue;
        }
      }
      const semesterInfo = await this.db
        .collection('semesters')
        .findOne({ _id: new Types.ObjectId(semester) });
      if (!semesterInfo) {
        item.statusCreate = 'Failed - semester not found';
        continue;
      }
      const leaderInfo = await this.db
        .collection('profiles')
        .findOne({ _id: new Types.ObjectId(leader) });
      if (!leaderInfo) {
        item.statusCreate = 'Failed - Leader not found';
        continue;
      }
      const secretaryInfo = await this.db
        .collection('profiles')
        .findOne({ _id: new Types.ObjectId(secretary) });
      if (!secretaryInfo) {
        item.statusCreate = 'Failed - secretary not found';
        continue;
      }
      if (type.trim() !== EtypeVolunteeProgram.FACULTY) {
        delete item.faculty;
      }
      item.organizingCommittee = {
        leader: item.leader,
        secretary: item.secretary,
      };
      delete item.leader;
      delete item.secretary;
      try {
        await new this.volunteeProgramSchema(item).save();
        item.statusCreate = 'Success - create voluntee program success.';
      } catch (error) {
        item.statusCreate = 'Failed - Can not create voluntee program.';
        continue;
      }
    }
    return data;
  }
}
