/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EtypeAttendance } from 'src/constants/constant';
import { FieldsCommonSchema } from 'src/utils/fields.common.schema';

export type StudyProcessAttendanceDocument = Study_Process_Attendance &
  Document;

@Schema() // analysis attendance by recognition
export class Study_Process_Attendance extends FieldsCommonSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject_registers',
    required: true,
  })
  subjectRegister: mongoose.Types.ObjectId;

  // @Prop()
  // numberAbsent: number; // unit: minute

  @Prop({ default: EtypeAttendance.MANUAL })
  type?: string; // face recognition system, manual, biometric ...

  @Prop()
  enterTime?: Date; // only use type face recognition and biometric

  @Prop()
  getoutTime?: Date; // only use type face recognition and biometric
}

export const StudyProcessAttendanceSchema = SchemaFactory.createForClass(
  Study_Process_Attendance,
);
