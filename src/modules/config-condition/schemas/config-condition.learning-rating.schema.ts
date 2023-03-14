/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EtypeLearningRate } from 'src/constants/constant';
import { FieldsCommonSchema } from 'src/utils/fields.common.schema';

export type ConfigConditionLearningRatingDocument =
  Config_Condition_Learning_Rating & Document;

@Schema()
export class Config_Condition_Learning_Rating extends FieldsCommonSchema {
  @Prop({
    type: String,
    required: true,
    default: 'Pretty',
  })
  name?: string; // pretty, good, excellent, weak, average,

  @Prop({
    required: true,
    default: EtypeLearningRate.TEN_POINT_SCALE,
  })
  type?: string;

  @Prop({ default: 6.5 })
  minimum?: number;

  @Prop({ default: 7.9 })
  maximum?: number;
}

export const ConfigConditionLearningRatingSchema = SchemaFactory.createForClass(
  Config_Condition_Learning_Rating,
);
