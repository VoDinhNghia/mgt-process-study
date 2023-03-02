import { ApiProperty } from '@nestjs/swagger';
import { EtypeLearningRate } from 'src/constants/constant';

export class UpdateConfigLearningRatingDto {
  @ApiProperty({ required: false, default: 'Pretty' })
  name?: string;

  @ApiProperty({
    required: false,
    default: EtypeLearningRate.TEN_POINT_SCALE,
  })
  type?: string;

  @ApiProperty({ required: false, default: 7.0 })
  minimum?: number;

  @ApiProperty({ required: false, default: 7.9 })
  maximum?: number;
}
