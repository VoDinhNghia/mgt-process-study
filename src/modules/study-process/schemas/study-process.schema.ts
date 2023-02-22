import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type StudyProcessDocument = StudyProcess & Document;

@Schema()
export class StudyProcess {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semesters',
    required: true,
  })
  semester?: mongoose.Types.ObjectId;

  @Prop({
    type: {
      attachment: mongoose.Schema.Types.ObjectId,
      scores: Number,
      expirationDate: Date,
    },
  })
  toeicCertificate?: {
    attachment: mongoose.Types.ObjectId;
    scores: number;
    expirationDate: Date;
  };

  @Prop({
    type: {
      attachment: mongoose.Schema.Types.ObjectId,
      scores: Number,
    },
  })
  itCertificate?: {
    attachment: mongoose.Types.ObjectId;
    scores: number;
  };

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const StudyProcessSchema = SchemaFactory.createForClass(StudyProcess);
