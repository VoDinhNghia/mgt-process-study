import { Body, Controller, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/utils/responseApi';
import { Response } from 'express';
import { ErolesUser } from 'src/constants/constant';
import { StudyProcessService } from './study-process.service';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateStudySubjectProcessDto } from './dtos/study-process.subject.dto';
import { Get, Param, UseInterceptors } from '@nestjs/common/decorators';
import { UpdateStudySubjectProcessDto } from './dtos/study-process.subject.update.dto';
import { ValidatePropertyGuard } from 'src/validates/validateUpdateSubjectRegister';

@Controller('api/study-process')
@ApiTags('study-process')
export class StudyProcessController {
  constructor(private readonly service: StudyProcessService) {}

  @Post('/subject-register')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([ErolesUser.ADMIN, ErolesUser.LECTURER, ErolesUser.STUDENT]),
  )
  async createSubjectRegister(
    @Body() subjectRegisterDto: CreateStudySubjectProcessDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.createSubjectRegister(subjectRegisterDto);
    return new ResponseRequest(res, result, 'Create subject register success.');
  }

  @Put('/subject-register/update-point/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.LECTURER]))
  @UseInterceptors(ValidatePropertyGuard)
  async updateSubjectPoint(
    @Param('id') id: string,
    @Body() subjectDto: UpdateStudySubjectProcessDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.updatePointSubject(id, subjectDto);
    return new ResponseRequest(res, result, 'Update subject register success.');
  }

  @Get('/subject-register/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([ErolesUser.ADMIN, ErolesUser.LECTURER, ErolesUser.STUDENT]),
  )
  async getSubjectRegisterById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.findSubjectRegisterById(id);
    return new ResponseRequest(
      res,
      result,
      'Get subject register by id success.',
    );
  }
}
