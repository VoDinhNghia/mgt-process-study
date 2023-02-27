import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateField } from 'src/abstracts/validateFieldById';
import { DbConnection } from 'src/commons/dBConnection';
import {
  StudyProcess,
  StudyProcessSchema,
} from './schemas/study-process.schema';
import { StudyProcessController } from './study-process.controller';
import { StudyProcessService } from './study-process.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudyProcess.name, schema: StudyProcessSchema },
    ]),
  ],
  controllers: [StudyProcessController],
  providers: [StudyProcessService, DbConnection, ValidateField],
})
export class StudyProcessModule {}
