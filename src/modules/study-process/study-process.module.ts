import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateField } from 'src/validates/validateFieldById';
import { DbConnection } from 'src/constants/dBConnection';
import {
  ConfigConditionPassSubject,
  ConfigConditionPassSubjectSchema,
} from '../config-condition-pass/schemas/config.condition-pass.schema';
import {
  SubjectRegisters,
  SubjectRegisterSchema,
} from './schemas/study-process.subject.schema';
import { StudyProcessController } from './study-process.controller';
import { StudyProcessService } from './study-process.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubjectRegisters.name, schema: SubjectRegisterSchema },
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
