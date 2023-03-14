import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigConditionController } from './config-condition.controller';
import { ConfigConditionService } from './config-condition.service';
import {
  Config_Condition_Learning_Rating,
  ConfigConditionLearningRatingSchema,
} from './schemas/config-condition.learning-rating.schema';
import {
  Config_Condition_Pass_Subject,
  ConfigConditionPassSubjectSchema,
} from './schemas/config-condition.subject-pass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Config_Condition_Pass_Subject.name,
        schema: ConfigConditionPassSubjectSchema,
      },
      {
        name: Config_Condition_Learning_Rating.name,
        schema: ConfigConditionLearningRatingSchema,
      },
    ]),
  ],
  controllers: [ConfigConditionController],
  providers: [ConfigConditionService],
})
export class ConfigConditionModule {}
