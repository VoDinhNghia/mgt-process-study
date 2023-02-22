import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbConnection } from 'src/commons/dBConnection';
@Module({
  imports: [],
  providers: [UsersService, DbConnection],
  controllers: [UsersController],
  exports: [UsersService, DbConnection],
})
export class UsersModule {}
