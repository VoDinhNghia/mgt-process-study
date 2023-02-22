import { Controller, UseGuards, Get, Res, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { roleTypeAccessApi } from 'src/commons/constants';
import { RoleGuard } from '../auth/role-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { UsersFillterDto } from './dto/user.filter.dto';
import { ResponseRequest } from 'src/abstracts/responseApi';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.FULL))
  async getAllUsers(
    @Query() usersFillterDto: UsersFillterDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.getAll(usersFillterDto);
    return new ResponseRequest(res, result, 'Get all users success');
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.ADMIN))
  async getUserByid(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.findUserById(id);
    return new ResponseRequest(res, result, 'Get user by id success');
  }
}
