import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/abstracts/responseApi';
import { Request, Response } from 'express';
import { KeyAccessApiGuard } from 'src/abstracts/validateApiAccess';
import { keyAccessBackend } from 'src/commons/constants';
import { StudyProcessService } from './study-process.service';

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
}
