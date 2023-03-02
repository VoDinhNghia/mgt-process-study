import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonException } from 'src/exceptions/execeptionError';
import { CreateConfigConditionSubjectDto } from './dtos/config.condition-pass.create.dto';
import { UpdateConfigConditionSubjectDto } from './dtos/config.condition-pass.update.dto';
import {
  ConfigConditionPassSubject,
  ConfigConditionPassSubjectDocument,
} from './schemas/config.condition-pass.schema';

@Injectable()
export class ConfigConditionPassService {
  constructor(
    @InjectModel(ConfigConditionPassSubject.name)
    private readonly schema: Model<ConfigConditionPassSubjectDocument>,
  ) {}

  async createConfigConditionSubject(
    configDto: CreateConfigConditionSubjectDto,
  ): Promise<ConfigConditionPassSubject> {
    const result = await new this.schema(configDto).save();
    return result;
  }

  async updateConfigConditionSubject(
    id: string,
    configDto: UpdateConfigConditionSubjectDto,
  ): Promise<ConfigConditionPassSubject> {
    await this.schema.findByIdAndUpdate(id, configDto);
    const result = await this.findConfigConditionSubjectById(id);
    return result;
  }

  async findConfigConditionSubjectById(
    id: string,
  ): Promise<ConfigConditionPassSubject> {
    const result = await this.schema.findById(id);
    if (!result) {
      new CommonException(404, 'Config not found.');
    }
    return result;
  }

  async findAllConfigCondionSubjects(): Promise<ConfigConditionPassSubject[]> {
    const results = await this.schema.find({});
    return results;
  }

  async deleteConfigCondionSubject(id: string): Promise<void> {
    await this.findConfigConditionSubjectById(id);
    await this.schema.findByIdAndDelete(id);
  }
}
