import { PartialType } from '@nestjs/swagger';
import { CreateConfigConditionSubjectDto } from './configs.create.subject-pass.dto';

export class UpdateConfigConditionSubjectDto extends PartialType(
  CreateConfigConditionSubjectDto,
) {}
