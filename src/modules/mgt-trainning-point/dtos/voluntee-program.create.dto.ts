import { ApiProperty } from '@nestjs/swagger';
import { EtypeVolunteeProgram } from 'src/constants/constant';
import { OrganizingCommitteeDto } from './organizing-committee.dto';

export class CreateVolunteeProgramDto {
  @ApiProperty({ required: false })
  faculty?: string;

  @ApiProperty({ required: true })
  semester?: string;

  @ApiProperty({ required: true, default: EtypeVolunteeProgram.FACULTY })
  type?: string;

  @ApiProperty({ required: true })
  title?: string;

  @ApiProperty({ required: true })
  description?: string;

  @ApiProperty({ required: true, default: '2023-03-03' })
  startDate?: string;

  @ApiProperty({ required: true, default: '2023-03-03' })
  endDate?: Date;

  @ApiProperty({ required: true })
  location?: string;

  @ApiProperty({ required: true, default: 5 })
  point?: number;

  @ApiProperty({ required: true, default: 40 })
  numberMember?: number;

  @ApiProperty({ required: true, type: OrganizingCommitteeDto })
  organizingCommittee?: OrganizingCommitteeDto;
}
