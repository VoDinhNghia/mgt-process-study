import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/abstracts/responseApi';
import { Request, Response } from 'express';
import { KeyAccessApiGuard } from 'src/abstracts/validateApiAccess';
import { keyAccessBackend, roleTypeAccessApi } from 'src/commons/constants';
import { StudyProcessService } from './study-process.service';
import { RoleGuard } from '../auth/role-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/study-process')
@ApiTags('study-process')
export class StudyProcessController {
  constructor(private readonly service: StudyProcessService) {}

  @Post()
  @UseGuards(KeyAccessApiGuard(keyAccessBackend))
  async createStudyProcess(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const { body } = req;
    const result = await this.service.createStudyProcess(body);
    return new ResponseRequest(res, result, 'Create study process success.');
  }

  @Get('/calculate-scholarship')
  @UseGuards(KeyAccessApiGuard(keyAccessBackend))
  async getListForScholarshipBackEnd(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    // output list user => accumulated points and trainning point
    const { semester } = req.query;
    console.log(semester);
    const result = true;
    return new ResponseRequest(res, result, 'Get list study process success.');
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
