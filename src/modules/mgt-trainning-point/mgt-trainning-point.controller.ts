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
import { roleTypeAccessApi } from 'src/constants/constant';
import { ResponseRequest } from 'src/utils/responseApi';
import { StorageObjectDto } from 'src/utils/upload-file.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role-auth.guard';
import { MgtTrainningPointService } from './mgt-trainning-point.service';
import { readFileSync } from 'fs';
import { csvFileFilter } from 'src/validates/validateUploadFileCSV';
import { join } from 'path';

@Controller('api/mgt-trainning-point')
@ApiTags('mgt-trainning-point')
export class MgtTrainningPointController {
  constructor(private readonly service: MgtTrainningPointService) {}

  @Post('/import/training-point')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: csvFileFilter,
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '../..', '..', './src/files/imports'));
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async importTrainingPoint(
    @Body() body: StorageObjectDto,
    @UploadedFile('file') file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = true;
    return new ResponseRequest(res, result, 'Import trainning point success.');
  }

  @Post('/import/voluntee-program')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: csvFileFilter,
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '../..', '..', './src/files/imports'));
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async importVolunteeProgram(
    @Res() res: Response,
    @Body() body: StorageObjectDto,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<ResponseRequest> {
    const data: any = readFileSync(file.path, 'utf8');
    console.log('data', data);
    const result = true;
    return new ResponseRequest(res, result, 'Import voluntee program success.');
  }
}
