import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudySubjectProcessDto {
  @ApiProperty({ required: false, default: 0 })
  midtermScore?: number;

  @ApiProperty({ required: false, default: 0 })
  finalScore?: number;

  @ApiProperty({ required: false, default: 0 })
  essayScore?: number;
}
