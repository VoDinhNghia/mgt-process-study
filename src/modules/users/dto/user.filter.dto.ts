import { ApiProperty } from '@nestjs/swagger';
import { EstatusUser, ErolesUser } from 'src/constants/constant';

export class UsersFillterDto {
  @ApiProperty({
    required: false,
    enum: ErolesUser,
    default: ErolesUser.STUDENT,
  })
  role?: string;

  @ApiProperty({
    required: false,
    enum: EstatusUser,
    default: EstatusUser.ACTIVE,
  })
  status?: string;

  @ApiProperty({ required: false })
  limit?: string;

  @ApiProperty({ required: false })
  page?: string;

  @ApiProperty({ required: false })
  searchKey?: string;
}
