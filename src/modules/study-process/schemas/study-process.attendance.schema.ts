import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type StudentAttendanceDocument = StudentAttendance & Document;

@Schema()
export class StudentAttendance {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studyprocess',
    required: true,
  })
  studyprocess: mongoose.Types.ObjectId;

  @Prop()
  numberAbsent: string; // 45', 1h ...

  @Prop()
  type?: string; // Face Recognition system, manual, biometric ...

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const StudentAttendanceSchema =
  SchemaFactory.createForClass(StudentAttendance);
