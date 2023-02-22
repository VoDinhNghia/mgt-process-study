import { Module } from '@nestjs/common';
import { StudyProcessController } from './study-process.controller';
import { StudyProcessService } from './study-process.service';

@Module({
  controllers: [StudyProcessController],
  providers: [StudyProcessService]
})
export class StudyProcessModule {}
