import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateField } from 'src/validates/validates.fields-id.dto';
import { DbConnection } from 'src/constants/constants.dB.mongo.connection';
import {
  Subject_Registers,
  SubjectRegisterSchema,
} from './schemas/study-process.subject.schema';
import { StudyProcessController } from './study-process.controller';
import { StudyProcessService } from './study-process.service';
import {
  ConfigConditionPassSubject,
  ConfigConditionPassSubjectSchema,
} from '../configs/schemas/configs.subject-pass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject_Registers.name, schema: SubjectRegisterSchema },
      {
        name: ConfigConditionPassSubject.name,
        schema: ConfigConditionPassSubjectSchema,
      },
    ]),
  ],
  controllers: [StudyProcessController],
  providers: [StudyProcessService, DbConnection, ValidateField],
})
export class StudyProcessModule {}
