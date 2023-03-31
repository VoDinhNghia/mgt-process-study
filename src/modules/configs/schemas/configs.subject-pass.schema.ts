import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EtypeConfigCoditionPassSubject } from 'src/constants/constant';
import { collections } from 'src/constants/constants.collections.name';
import { FieldsCommonSchema } from 'src/utils/utils.fields.common.schema';

export type ConfigConditionPassSubjectDocument = ConfigConditionPassSubject &
  Document;

@Schema({
  collection: collections.config_condition_pass_subjects,
  versionKey: false,
})
export class ConfigConditionPassSubject extends FieldsCommonSchema {
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

  @Prop({ default: 4.0, min: 0, max: 10 }) // >= condition => pass else failed
  condition?: number;
}

export const ConfigConditionPassSubjectSchema = SchemaFactory.createForClass(
  ConfigConditionPassSubject,
);
