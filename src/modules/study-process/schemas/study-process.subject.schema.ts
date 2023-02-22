import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type SubjectRegisterDocument = SubjectRegisters & Document;

@Schema()
export class SubjectRegisters {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects',
    required: true,
  })
  subject?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studyprocess',
    required: true,
  })
  studyprocess?: mongoose.Types.ObjectId;

  @Prop()
  statusRegister?: boolean; // true: register success.

  @Prop()
  midtermScore?: number;

  @Prop()
  finalScore?: number; // if attendance absent > 3 then 0;

  @Prop()
  essayCore?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const SubjectRegisterSchema =
  SchemaFactory.createForClass(SubjectRegisters);