import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigConditionController } from './config-condition.controller';
import { ConfigConditionService } from './config-condition.service';
import {
  ConfigConditionLearningRating,
  ConfigConditionLearningRatingSchema,
} from './schemas/config-condition.learning-rating.schema';
import {
  ConfigConditionPassSubject,
  ConfigConditionPassSubjectSchema,
} from './schemas/config-condition.subject-pass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ConfigConditionPassSubject.name,
        schema: ConfigConditionPassSubjectSchema,
      },
      {
        name: ConfigConditionLearningRating.name,
        schema: ConfigConditionLearningRatingSchema,
      },
    ]),
  ],
  controllers: [ConfigConditionController],
  providers: [ConfigConditionService],
})
export class ConfigConditionModule {}
