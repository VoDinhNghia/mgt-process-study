/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EtypeDegree } from 'src/constants/constant';
import { FieldsCommonSchema } from 'src/utils/utils.fields.common.schema';

export type DegreeManagementDocument = Degree_Management & Document;

@Schema()
export class Degree_Management extends FieldsCommonSchema {
  @Prop({
    type: String,
    required: true,
  })
  name?: string; // Bachelor of Computer Science

  @Prop()
  description?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
  })
  user?: mongoose.Types.ObjectId;

  @Prop()
  year?: string; // 2016 - 2020

  @Prop({ default: EtypeDegree.PRETTY })
  type?: string;

  @Prop()
  recognitionDate?: Date;

  @Prop()
  number?: number; // so hieu
}

export const DegreeManagementSchema =
  SchemaFactory.createForClass(Degree_Management);
