import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/auth.local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './guards/auth.constants';
import { JwtStrategy } from './guards/auth.jwt.strategy';
import { DbConnection } from 'src/constants/constants.dB.mongo.connection';
import { AuthController } from './auth.controller';
import { expiresInJwt } from 'src/constants/constant';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: jwtConstants.JWT_PRIVATE_KEY,
      publicKey: jwtConstants.JWT_PUBLIC_KEY,
      signOptions: {
        expiresIn: expiresInJwt,
        algorithm: 'HS512',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, DbConnection],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
