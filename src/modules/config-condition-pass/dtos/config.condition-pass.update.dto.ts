import { ApiProperty } from '@nestjs/swagger';
import { EtypeConfigCoditionPassSubject } from 'src/constants/constant';

export class UpdateConfigConditionSubjectDto {
  @ApiProperty({ required: false, default: 'Condition accumulated point' })
  name?: string;

  @ApiProperty({
    required: false,
    default: EtypeConfigCoditionPassSubject.ACCUMULATED_POINT,
  })
  type?: string;

  @ApiProperty({ required: false, default: 4.0 })
  condition?: number;
}
