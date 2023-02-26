import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TranningPointsDocument = TranningPoints & Document;

@Schema()
export class TranningPoints {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studyprocess',
    required: true,
  })
  studyprocess?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semesters',
  })
  semester?: mongoose.Types.ObjectId;

  @Prop()
  program?: string;

  @Prop()
  point?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const StudyProcessTraningPointSchema =
  SchemaFactory.createForClass(TranningPoints);
