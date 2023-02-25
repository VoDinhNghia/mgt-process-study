import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type StudyProcessAttendanceDocument = StudyProcessAttendance & Document;

@Schema()
export class StudyProcessAttendance {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjectregisters',
    required: true,
  })
  subjectRegister: mongoose.Types.ObjectId;

  @Prop()
  numberAbsent: string; // 45', 1h ...

  @Prop()
  type?: string; // Face Recognition system, manual, biometric ...

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const StudyProcessAttendanceSchema = SchemaFactory.createForClass(
  StudyProcessAttendance,
);
