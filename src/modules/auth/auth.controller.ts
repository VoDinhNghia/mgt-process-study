import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dtos/auth.login.dto';
import { JwtAuthGuard } from './guards/auth.jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from '../../utils/utils.response-api';
import { authController } from 'src/constants/constants.controller.name-tag';
import { authMsg } from 'src/constants/constants.message.response';
import { UserLoginResponseDto } from './dtos/auth.result.login-service.dto';

@Controller(authController.name)
@ApiTags(authController.tag)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.authService.login(loginDto);
    return new ResponseRequest(res, result, authMsg.login);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    const user: UserLoginResponseDto = req?.user;
    const profileId: string = user?.profileId;
    const result = await this.authService.getMe(profileId);
    return new ResponseRequest(res, result, authMsg.getMe);
  }
}
