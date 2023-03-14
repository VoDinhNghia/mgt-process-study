import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonException } from 'src/exceptions/execeptionError';
import { CreateConfigLearningRatingDto } from './dtos/config-condition.create.learning-rating.dto';
import { CreateConfigConditionSubjectDto } from './dtos/config-condition.create.subject-pass.dto';
import { UpdateConfigLearningRatingDto } from './dtos/config-condition.update.learning-rating.dto';
import { UpdateConfigConditionSubjectDto } from './dtos/config-condition.update.subject-pass.dto';
import {
  Config_Condition_Learning_Rating,
  ConfigConditionLearningRatingDocument,
} from './schemas/config-condition.learning-rating.schema';
import {
  Config_Condition_Pass_Subject,
  ConfigConditionPassSubjectDocument,
} from './schemas/config-condition.subject-pass.schema';

@Injectable()
export class ConfigConditionService {
  constructor(
    @InjectModel(Config_Condition_Pass_Subject.name)
    private readonly subjectSettingSchema: Model<ConfigConditionPassSubjectDocument>,
    @InjectModel(Config_Condition_Learning_Rating.name)
    private readonly learningRatingSchema: Model<ConfigConditionLearningRatingDocument>,
  ) {}

  async createConfigConditionSubject(
    configDto: CreateConfigConditionSubjectDto,
  ): Promise<Config_Condition_Pass_Subject> {
    const result = await new this.subjectSettingSchema(configDto).save();
    return result;
  }

  async updateConfigConditionSubject(
    id: string,
    configDto: UpdateConfigConditionSubjectDto,
  ): Promise<Config_Condition_Pass_Subject> {
    await this.subjectSettingSchema.findByIdAndUpdate(id, configDto);
    const result = await this.findConfigConditionSubjectById(id);
    return result;
  }

  async findConfigConditionSubjectById(
    id: string,
  ): Promise<Config_Condition_Pass_Subject> {
    const result = await this.subjectSettingSchema.findById(id);
    if (!result) {
      new CommonException(404, 'Config not found.');
    }
    return result;
  }

  async findAllConfigCondionSubjects(): Promise<
    Config_Condition_Pass_Subject[]
  > {
    const results = await this.subjectSettingSchema.find({});
    return results;
  }

  async deleteConfigCondionSubject(id: string): Promise<void> {
    await this.findConfigConditionSubjectById(id);
    await this.subjectSettingSchema.findByIdAndDelete(id);
  }

  async createConfigLearningRating(
    configDto: CreateConfigLearningRatingDto,
  ): Promise<Config_Condition_Learning_Rating> {
    const result = await new this.learningRatingSchema(configDto).save();
    return result;
  }

  async updateConfigLearningRating(
    id: string,
    configDto: UpdateConfigLearningRatingDto,
  ): Promise<Config_Condition_Learning_Rating> {
    await this.learningRatingSchema.findByIdAndUpdate(id, configDto);
    const result = await this.findConfigConditionSubjectById(id);
    return result;
  }

  async findConfigLearningRatingById(
    id: string,
  ): Promise<Config_Condition_Learning_Rating> {
    const result = await this.learningRatingSchema.findById(id);
    if (!result) {
      new CommonException(404, 'Config learning rating not found.');
    }
    return result;
  }

  async findAllConfigLearningRatings(): Promise<
    Config_Condition_Learning_Rating[]
  > {
    const results = await this.learningRatingSchema.find({});
    return results;
  }

  async deleteConfigLearningRating(id: string): Promise<void> {
    await this.findConfigLearningRatingById(id);
    await this.learningRatingSchema.findByIdAndDelete(id);
  }
}
