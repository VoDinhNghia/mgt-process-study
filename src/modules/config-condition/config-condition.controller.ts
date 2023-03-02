import {
  Body,
  Controller,
  Post,
  Put,
  Res,
  UseGuards,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/utils/responseApi';
import { roleTypeAccessApi } from 'src/constants/constant';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role-auth.guard';
import { ConfigConditionService } from './config-condition.service';
import { CreateConfigConditionSubjectDto } from './dtos/config-condition.create.subject-pass.dto';
import { Response } from 'express';
import { UpdateConfigConditionSubjectDto } from './dtos/config-condition.update.subject-pass.dto';
import { CreateConfigLearningRatingDto } from './dtos/config-condition.create.learning-rating.dto';
import { UpdateConfigLearningRatingDto } from './dtos/config-condition.update.learning-rating.dto';

@Controller('api/config-condition')
@ApiTags('config-condition')
export class ConfigConditionController {
  constructor(private readonly service: ConfigConditionService) {}

  @Post('/subject-pass')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async createConfigSubjectPass(
    @Body() configDto: CreateConfigConditionSubjectDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.createConfigConditionSubject(configDto);
    return new ResponseRequest(res, result, 'Create config success.');
  }

  @Post('/learning-rating')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async createConfigLearningRating(
    @Body() configLearningRatingDto: CreateConfigLearningRatingDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.createConfigLearningRating(
      configLearningRatingDto,
    );
    return new ResponseRequest(
      res,
      result,
      'Create config learning rating success.',
    );
  }

  @Put('/subject-pass/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async updateConfigSubjectPass(
    @Param('id') id: string,
    @Body() configDto: UpdateConfigConditionSubjectDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.updateConfigConditionSubject(
      id,
      configDto,
    );
    return new ResponseRequest(res, result, 'Update config success.');
  }

  @Put('/learning-rating/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async updateConfigLearningRating(
    @Param('id') id: string,
    @Body() configLearningRatingDto: UpdateConfigLearningRatingDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.updateConfigLearningRating(
      id,
      configLearningRatingDto,
    );
    return new ResponseRequest(
      res,
      result,
      'Update config learning rating success.',
    );
  }

  @Delete('/subject-pass/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async deleteConfigSubjectPass(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.deleteConfigCondionSubject(id);
    return new ResponseRequest(res, true, 'Delete config success.');
  }

  @Delete('/learning-rating/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async deleteConfigLearningRating(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.deleteConfigLearningRating(id);
    return new ResponseRequest(
      res,
      true,
      'Delete config learning rating success.',
    );
  }

  @Get('/subject-pass')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async getAllConfigSubjectPass(
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const results = await this.service.findAllConfigCondionSubjects();
    return new ResponseRequest(res, results, 'Get all config success.');
  }

  @Get('/learning-rating')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async getAllConfigLearningRating(
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const results = await this.service.findAllConfigLearningRatings();
    return new ResponseRequest(
      res,
      results,
      'Get all config learning rating success.',
    );
  }

  @Get('/subject-pass/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async getConfigSubjectPassById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.findConfigConditionSubjectById(id);
    return new ResponseRequest(res, result, 'Get config by Id success.');
  }

  @Get('/learning-rating/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async getConfigLearningRatingById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.findConfigLearningRatingById(id);
    return new ResponseRequest(
      res,
      result,
      'Get config learning rating by Id success.',
    );
  }
}
