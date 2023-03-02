import { ApiProperty } from '@nestjs/swagger';
import { EtypeConfigCoditionPassSubject } from 'src/constants/constant';

export class CreateConfigConditionSubjectDto {
  @ApiProperty({ required: true, default: 'Condition accumulated point' })
  name?: string;

  @ApiProperty({
    required: true,
    default: EtypeConfigCoditionPassSubject.ACCUMULATED_POINT,
  })
  type?: string;

  @ApiProperty({ required: true, default: 4.0 })
  condition?: number;
}
