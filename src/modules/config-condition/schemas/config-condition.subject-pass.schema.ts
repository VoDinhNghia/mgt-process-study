/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EtypeConfigCoditionPassSubject } from 'src/constants/constant';
import { FieldsCommonSchema } from 'src/utils/fields.common.schema';

export type ConfigConditionPassSubjectDocument = Config_Condition_Pass_Subject &
  Document;

@Schema()
export class Config_Condition_Pass_Subject extends FieldsCommonSchema {
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
}

export const ConfigConditionPassSubjectSchema = SchemaFactory.createForClass(
  Config_Condition_Pass_Subject,
);
