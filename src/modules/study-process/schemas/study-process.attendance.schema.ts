import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EtypeAttendance } from 'src/constants/constant';

export type StudyProcessAttendanceDocument = StudyProcessAttendance & Document;

@Schema() // analysis attendance by recognition
export class StudyProcessAttendance {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjectregisters',
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

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const StudyProcessAttendanceSchema = SchemaFactory.createForClass(
  StudyProcessAttendance,
);
