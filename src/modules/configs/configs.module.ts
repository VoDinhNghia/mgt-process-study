import { Module } from '@nestjs/common';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ConfigConditionPassSubject,
  ConfigConditionPassSubjectSchema,
} from './schemas/configs.subject-pass.schema';
import {
  ConfigConditionLearningRating,
  ConfigConditionLearningRatingSchema,
} from './schemas/configs.learning-rating.schema';

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
  controllers: [ConfigsController],
  providers: [ConfigsService],
})
export class ConfigsModule {}
