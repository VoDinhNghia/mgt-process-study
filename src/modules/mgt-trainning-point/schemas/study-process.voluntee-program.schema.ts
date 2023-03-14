/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EtypeVolunteeProgram } from 'src/constants/constant';
import { FieldsCommonSchema } from 'src/utils/fields.common.schema';

export type VolunteeProgramsDocument = Voluntee_Programs & Document;

@Schema()
export class Voluntee_Programs extends FieldsCommonSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'faculties',
  })
  faculty?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semesters',
    required: true,
  })
  semester?: mongoose.Types.ObjectId;

  @Prop({ default: EtypeVolunteeProgram.FACULTY })
  type?: string;

  @Prop({
    required: true,
  })
  title?: string;

  @Prop()
  description?: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop()
  location?: string;

  @Prop({ default: true })
  status?: boolean; // true => open, false => close

  @Prop({ required: true })
  point?: number;

  @Prop()
  numberMember?: number;

  @Prop({
    type: {
      leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles',
      },
      secretary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles',
      },
    },
  })
  organizingCommittee?: {
    leader?: mongoose.Types.ObjectId;
    secretary?: mongoose.Types.ObjectId;
  };
}

export const VolunteeProgramsSchema =
  SchemaFactory.createForClass(Voluntee_Programs);
