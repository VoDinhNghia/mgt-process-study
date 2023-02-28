import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/abstracts/responseApi';
import { Response } from 'express';
import { roleTypeAccessApi } from 'src/commons/constants';
import { StudyProcessService } from './study-process.service';
import { RoleGuard } from '../auth/role-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStudySubjectProcessDto } from './dtos/study-process.subject.dto';

@Controller('api/study-process')
@ApiTags('study-process')
export class StudyProcessController {
  constructor(private readonly service: StudyProcessService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.FULL))
  async createSubjectRegister(
    @Body() subjectRegisterDto: CreateStudySubjectProcessDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.createSubjectRegister(subjectRegisterDto);
    return new ResponseRequest(res, result, 'Create subject register success.');
  }

  @Post('/import/training-point')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async importTrainingPoint(@Res() res: Response): Promise<ResponseRequest> {
    const result = true;
    return new ResponseRequest(res, result, 'Create trainning point success.');
  }
}
