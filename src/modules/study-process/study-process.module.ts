import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateField } from 'src/validates/validateFieldById';
import { DbConnection } from 'src/constants/dBConnection';
import {
  Config_Condition_Pass_Subject,
  ConfigConditionPassSubjectSchema,
} from '../config-condition/schemas/config-condition.subject-pass.schema';
import {
  Subject_Registers,
  SubjectRegisterSchema,
} from './schemas/study-process.subject.schema';
import { StudyProcessController } from './study-process.controller';
import { StudyProcessService } from './study-process.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject_Registers.name, schema: SubjectRegisterSchema },
      {
        name: Config_Condition_Pass_Subject.name,
        schema: ConfigConditionPassSubjectSchema,
      },
    ]),
  ],
  controllers: [StudyProcessController],
  providers: [StudyProcessService, DbConnection, ValidateField],
})
export class StudyProcessModule {}
