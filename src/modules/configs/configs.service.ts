import { Injectable } from '@nestjs/common';
import {
  ConfigConditionLearningRating,
  ConfigConditionLearningRatingDocument,
} from './schemas/configs.learning-rating.schema';
import {
  ConfigConditionPassSubject,
  ConfigConditionPassSubjectDocument,
} from './schemas/configs.subject-pass.schema';
import { CommonException } from 'src/exceptions/execeptions.common-error';
import { CreateConfigConditionSubjectDto } from './dtos/configs.create.subject-pass.dto';
import { UpdateConfigConditionSubjectDto } from './dtos/configs.update.subject-pass.dto';
import { CreateConfigLearningRatingDto } from './dtos/configs.create.learning-rating.dto';
import { UpdateConfigLearningRatingDto } from './dtos/configs.update.learning-rating.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectModel(ConfigConditionPassSubject.name)
    private readonly subjectSettingSchema: Model<ConfigConditionPassSubjectDocument>,
    @InjectModel(ConfigConditionLearningRating.name)
    private readonly learningRatingSchema: Model<ConfigConditionLearningRatingDocument>,
  ) {}

  async createConfigConditionSubject(
    configDto: CreateConfigConditionSubjectDto,
  ): Promise<ConfigConditionPassSubject> {
    const result = await new this.subjectSettingSchema(configDto).save();
    return result;
  }

  async updateConfigConditionSubject(
    id: string,
    configDto: UpdateConfigConditionSubjectDto,
  ): Promise<ConfigConditionPassSubject> {
    await this.subjectSettingSchema.findByIdAndUpdate(id, configDto);
    const result = await this.findConfigConditionSubjectById(id);
    return result;
  }

  async findConfigConditionSubjectById(
    id: string,
  ): Promise<ConfigConditionPassSubject> {
    const result = await this.subjectSettingSchema.findById(id);
    if (!result) {
      new CommonException(404, 'Config not found.');
    }
    return result;
  }

  async findAllConfigCondionSubjects(): Promise<ConfigConditionPassSubject[]> {
    const results = await this.subjectSettingSchema.find({});
    return results;
  }

  async deleteConfigCondionSubject(id: string): Promise<void> {
    await this.findConfigConditionSubjectById(id);
    await this.subjectSettingSchema.findByIdAndDelete(id);
  }

  async createConfigLearningRating(
    configDto: CreateConfigLearningRatingDto,
  ): Promise<ConfigConditionLearningRating> {
    const result = await new this.learningRatingSchema(configDto).save();
    return result;
  }

  async updateConfigLearningRating(
    id: string,
    configDto: UpdateConfigLearningRatingDto,
  ): Promise<ConfigConditionLearningRating> {
    await this.learningRatingSchema.findByIdAndUpdate(id, configDto);
    const result = await this.findConfigConditionSubjectById(id);
    return result;
  }

  async findConfigLearningRatingById(
    id: string,
  ): Promise<ConfigConditionLearningRating> {
    const result = await this.learningRatingSchema.findById(id);
    if (!result) {
      new CommonException(404, 'Config learning rating not found.');
    }
    return result;
  }

  async findAllConfigLearningRatings(): Promise<
    ConfigConditionLearningRating[]
  > {
    const results = await this.learningRatingSchema.find({});
    return results;
  }

  async deleteConfigLearningRating(id: string): Promise<void> {
    await this.findConfigLearningRatingById(id);
    await this.learningRatingSchema.findByIdAndDelete(id);
  }
}
