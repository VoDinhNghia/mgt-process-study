import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommonException } from 'src/exceptions/execeptions.common-error';
import { cryptoPassWord } from 'src/constants/constants.crypto';
import { DbConnection } from 'src/constants/constants.dB.mongo.connection';
import { EstatusUser } from 'src/constants/constant';
import { LoginDto } from './dtos/auth.login.dto';
import { authMsg } from 'src/constants/constants.message.response';
import { UserLoginResponseDto } from './dtos/auth.result.login-service.dto';
import { userLookup } from 'src/utils/utils.lookup-query.service';
import { ImatchAuth, ImatchGetMe } from './interfaces/auth.interface';
import { collections } from 'src/constants/constants.collections.name';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly db: DbConnection,
  ) {}

  async login(loginDto: LoginDto): Promise<UserLoginResponseDto> {
    const { email, passWord } = loginDto;
    const user = await this.findUserAuth(email, passWord);
    if (!user) {
      new CommonException(401, authMsg.errorAuth);
    }
    const result = {
      ...user,
      statusLogin: true,
      accessToken: this.jwtService.sign({ ...user }),
    };
    return result;
  }

  async findUserAuth(
    email: string,
    passWord: string,
  ): Promise<UserLoginResponseDto> {
    const password = cryptoPassWord(passWord);
    const match: ImatchAuth = {
      $match: { email, passWord: password, status: EstatusUser.ACTIVE },
    };
    const lookup = userLookup();
    const project = [
      {
        $project: {
          _id: 1,
          email: 1,
          role: 1,
          status: 1,
          'profile._id': 1,
          'profile.firstName': 1,
          'profile.lastName': 1,
          'profile.middleName': 1,
        },
      },
    ];
    const aggregate = [match, ...lookup, ...project];
    const cursorAgg = await this.db
      .collection(collections.users)
      .aggregate(aggregate);
    const result = await cursorAgg.toArray();
    return result[0] ?? null;
  }

  async getMe(profileId: string): Promise<UserLoginResponseDto> {
    const match: ImatchGetMe = { _id: new Types.ObjectId(profileId) };
    const lookup = userLookup();
    const aggregate = [match, ...lookup];
    const cursorAgg = await this.db
      .collection(collections.users)
      .aggregate(aggregate);
    const result = await cursorAgg.toArray();
    return result[0] ?? null;
  }
}
