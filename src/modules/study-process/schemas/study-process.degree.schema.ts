import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EtypeDegree } from 'src/constants/constant';

export type DegreeManagementDocument = DegreeManagement & Document;

@Schema()
export class DegreeManagement {
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

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const DegreeManagementSchema =
  SchemaFactory.createForClass(DegreeManagement);
