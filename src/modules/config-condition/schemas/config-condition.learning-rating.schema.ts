import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EtypeLearningRate } from 'src/constants/constant';

export type ConfigConditionLearningRatingDocument =
  ConfigConditionLearningRating & Document;

@Schema()
export class ConfigConditionLearningRating {
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

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const ConfigConditionLearningRatingSchema = SchemaFactory.createForClass(
  ConfigConditionLearningRating,
);
