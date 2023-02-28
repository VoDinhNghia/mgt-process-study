import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudySubjectProcessDto {
  @ApiProperty({ required: false })
  subject?: string;

  @ApiProperty({ required: false })
  studyprocess?: string;

  @ApiProperty({ required: false, default: true })
  statusRegister?: boolean;

  @ApiProperty({ required: false, default: 0 })
  midtermScore?: number;

  @ApiProperty({ required: false, default: 0 })
  finalScore?: number;

  @ApiProperty({ required: false, default: 0 })
  essayCore?: number;
}
