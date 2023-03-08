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
    ref: 'studyprocesses',
    required: true,
  })
  studyprocess?: mongoose.Types.ObjectId;

  @Prop({ default: true })
  statusRegister?: boolean; // true: register success.

  // @Prop()
  // tuition?: number;

  @Prop()
  midtermScore?: number;

  @Prop()
  finalScore?: number;

  @Prop()
  accumalatedPoint?: number; // if attendance absent > 3 then 0 (check finalScore when create);

  @Prop()
  status: string;

  @Prop()
  essayScore?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const SubjectRegisterSchema =
  SchemaFactory.createForClass(SubjectRegisters);
