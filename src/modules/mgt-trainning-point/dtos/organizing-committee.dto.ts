import { ApiProperty } from '@nestjs/swagger';

export class OrganizingCommitteeDto {
  @ApiProperty({ required: true })
  leader?: string;

  @ApiProperty({ required: true })
  secretary?: string;
}
