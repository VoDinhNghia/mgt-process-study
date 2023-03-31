import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ResponseRequest {
  constructor(
    res: Response,
    data: object | object[] | string | number | boolean,
    message: string,
  ) {
    res.status(HttpStatus.OK).json({
      statusCode: 200,
      data,
      message,
    });
  }
}
