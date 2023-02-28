import { ApiProperty } from '@nestjs/swagger';

export class CreateStudySubjectProcessDto {
  @ApiProperty({ required: true })
  subject?: string;

  @ApiProperty({ required: true })
  studyprocess?: string;

  @ApiProperty({ required: true, default: true })
  statusRegister?: boolean; // true: register success.
}
