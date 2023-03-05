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
import { ResponseRequest } from 'src/utils/responseApi';
import { StorageObjectDto } from 'src/utils/upload-file.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role-auth.guard';
import { MgtTrainningPointService } from './mgt-trainning-point.service';
import {
  csvFileFilter,
  destinationSave,
  fileName,
} from 'src/validates/validateUploadFileCSV';
import { readFileSync } from 'fs';
import { getDataFromCsvFileUpload } from 'src/utils/handleFileCsvUpload';
import { Response } from 'express';

@Controller('api/mgt-trainning-point')
@ApiTags('mgt-trainning-point')
export class MgtTrainningPointController {
  constructor(private readonly service: MgtTrainningPointService) {}

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
