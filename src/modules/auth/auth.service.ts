import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommonException } from 'src/exceptions/execeptionError';
import { cryptoPassWord } from 'src/constants/crypto';
import { DbConnection } from 'src/constants/dBConnection';
import { EstatusUser } from 'src/constants/constant';
import { LookupCommon } from 'src/utils/lookup.aggregate-query';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly db: DbConnection,
  ) {}

  async login(userDto: Record<string, any>) {
    const { email, passWord } = userDto;
    const user = await this.findUserAuth(email, passWord);
    if (!user) {
      new CommonException(401, `User or password incorrect.`);
    }
    const payload = {
      ...user,
      statusLogin: true,
    };
    return {
      ...payload,
      historyLogin: user.historyLogin,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async findUserAuth(email: string, passWord: string): Promise<any> {
    const password = cryptoPassWord(passWord);
    const match: Record<string, any> = {
      $match: { email, passWord: password, status: EstatusUser.ACTIVE },
    };
    const lookup: any = new LookupCommon([
      {
        from: 'profiles',
        localField: '_id',
        foreignField: 'user',
        as: 'profile',
        unwind: true,
      },
    ]);
    const project: Record<string, any>[] = [
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
    const cursorAgg = await this.db.collection('users').aggregate(aggregate);
    const result = await cursorAgg.toArray();
    return result[0] ?? null;
  }
}
