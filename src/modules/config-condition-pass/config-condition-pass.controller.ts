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
import { ResponseRequest } from 'src/abstracts/responseApi';
import { roleTypeAccessApi } from 'src/commons/constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role-auth.guard';
import { ConfigConditionPassService } from './config-condition-pass.service';
import { CreateConfigConditionSubjectDto } from './dtos/config.condition-pass.create.dto';
import { Response } from 'express';
import { UpdateConfigConditionSubjectDto } from './dtos/config.condition-pass.update.dto';

@Controller('api/config-condition-pass')
@ApiTags('config-condition-subject-pass')
export class ConfigConditionPassController {
  constructor(private readonly service: ConfigConditionPassService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async createConfig(
    @Body() configDto: CreateConfigConditionSubjectDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.createConfigConditionSubject(configDto);
    return new ResponseRequest(res, result, 'Create config success.');
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async updateConfig(
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

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async deleteConfig(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.deleteConfigCondionSubject(id);
    return new ResponseRequest(res, true, 'Delete config success.');
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async getAllConfig(@Res() res: Response): Promise<ResponseRequest> {
    const results = await this.service.findAllConfigCondionSubjects();
    return new ResponseRequest(res, results, 'Get all config success.');
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async getConfigById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.findConfigConditionSubjectById(id);
    return new ResponseRequest(res, result, 'Get config by Id success.');
  }
}
