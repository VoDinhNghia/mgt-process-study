/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { FieldsCommonSchema } from 'src/utils/utils.fields.common.schema';

export type SubjectRegisterDocument = Subject_Registers & Document;

@Schema()
export class Subject_Registers extends FieldsCommonSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects',
    required: true,
  })
  subject?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'study_processes',
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
}

export const SubjectRegisterSchema =
  SchemaFactory.createForClass(Subject_Registers);
