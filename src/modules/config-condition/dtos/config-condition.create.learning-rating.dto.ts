import { ApiProperty } from '@nestjs/swagger';
import { EtypeLearningRate } from 'src/constants/constant';

export class CreateConfigLearningRatingDto {
  @ApiProperty({ required: true, default: 'Pretty' })
  name?: string;

  @ApiProperty({
    required: true,
    default: EtypeLearningRate.TEN_POINT_SCALE,
  })
  type?: string;

  @ApiProperty({ required: true, default: 7.0 })
  minimum?: number;

  @ApiProperty({ required: true, default: 7.9 })
  maximum?: number;
}
