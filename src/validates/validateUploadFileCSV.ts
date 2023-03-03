import { HttpException } from '@nestjs/common';
import { join } from 'path';

export const csvFileFilter = (
  req: Record<any, any>,
  file: Record<string, any>,
  callback: any,
) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(
      new HttpException(
        { statusCode: 400, message: 'Only allowed *.csv file' },
        400,
      ),
      false,
    );
  }
  callback(null, true);
};

export const destinationSave = (
  req: Record<any, any>,
  file: Record<string, any>,
  cb: any,
) => {
  cb(null, join(__dirname, '../..', './src/files/imports'));
};

export const fileName = (
  req: Record<any, any>,
  file: Record<string, any>,
  cb: any,
) => {
  cb(null, file.originalname);
};
