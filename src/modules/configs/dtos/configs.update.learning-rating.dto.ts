import { PartialType } from '@nestjs/swagger';
import { CreateConfigLearningRatingDto } from './configs.create.learning-rating.dto';

export class UpdateConfigLearningRatingDto extends PartialType(
  CreateConfigLearningRatingDto,
) {}
