import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ErolesUser } from 'src/constants/constant';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { StorageObjectDto } from 'src/utils/utils.upload-file.dto';
import { JwtAuthGuard } from '../auth/guards/auth.jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { TrainningPointService } from './trainning-point.service';
import {
  csvFileFilter,
  destinationSave,
  fileName,
} from 'src/validates/validates.upload.file-csv';
import { readFileSync } from 'fs';
import { getDataFromCsvFileUpload } from 'src/utils/utils.file-upload-csv.get-data';
import { Response } from 'express';
import { trainningPointController } from 'src/constants/constants.controller.name-tag';

@Controller(trainningPointController.name)
@ApiTags(trainningPointController.tag)
export class MgtTrainningPointController {
  constructor(private readonly service: TrainningPointService) {}

  @Post('/import/training-point')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.ADMIN]))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: csvFileFilter,
      storage: diskStorage({
        destination: destinationSave,
        filename: fileName,
      }),
    }),
  )
  async importTrainingPoint(
    @Body() body: StorageObjectDto,
    @UploadedFile('file') file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const rawData = readFileSync(file.path, 'utf8');
    const csvData = getDataFromCsvFileUpload(rawData);
    const result = await this.service.createTrainningPoint(csvData);
    return new ResponseRequest(res, result, 'Import trainning point success.');
  }

  @Post('/import/voluntee-program')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.ADMIN]))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: csvFileFilter,
      storage: diskStorage({
        destination: destinationSave,
        filename: fileName,
      }),
    }),
  )
  async importVolunteeProgram(
    @Res() res: Response,
    @Body() body: StorageObjectDto,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<ResponseRequest> {
    const rawData = readFileSync(file.path, 'utf8');
    const csvData = getDataFromCsvFileUpload(rawData);
    const result = await this.service.importMultiVolunteeProgram(csvData);
    return new ResponseRequest(res, result, 'Import voluntee program success.');
  }
}
