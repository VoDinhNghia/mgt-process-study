import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EtypeConfigCoditionPassSubject } from 'src/constants/constant';

export type ConfigConditionPassSubjectDocument = ConfigConditionPassSubject &
  Document;

@Schema()
export class ConfigConditionPassSubject {
  @Prop({
    type: String,
    required: true,
  })
  name?: string; // Condition accumulated point

  @Prop({
    required: true,
    default: EtypeConfigCoditionPassSubject.ACCUMULATED_POINT,
  })
  type?: string;

  @Prop({ default: 4.0 }) // >= condition => pass else failed
  condition?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updateAt?: Date;
}

export const ConfigConditionPassSubjectSchema = SchemaFactory.createForClass(
  ConfigConditionPassSubject,
);
