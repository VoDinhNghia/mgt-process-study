/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { FieldsCommonSchema } from 'src/utils/fields.common.schema';

export type TranningPointsDocument = Trainning_Points & Document; // nho update ben BE cho scholarship

@Schema()
export class Trainning_Points extends FieldsCommonSchema {
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
    ref: 'voluntee_programs',
  })
  program?: mongoose.Types.ObjectId;

  @Prop({ default: false })
  status?: boolean;

  @Prop()
  attendance?: Date;
}

export const TranningPointSchema =
  SchemaFactory.createForClass(Trainning_Points);
