import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TranningPointsDocument = TranningPoints & Document;

@Schema()
export class TranningPoints {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
    required: true,
  })
  user?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semesters',
  })
  semester?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'volunteeprograms',
  })
  program?: mongoose.Types.ObjectId;

  @Prop({ default: false })
  status?: boolean;

  @Prop()
  attendance?: Date;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const TranningPointSchema = SchemaFactory.createForClass(TranningPoints);
