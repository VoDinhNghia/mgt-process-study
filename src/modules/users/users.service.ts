import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { cryptoPassWord } from 'src/constants/crypto';
import { EstatusUser } from 'src/constants/constant';
import { UsersFillterDto } from './dto/user.filter.dto';
import { DbConnection } from 'src/constants/dBConnection';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbConnection) {}

  async findUserAuth(email: string, passWord: string): Promise<any> {
    const password = cryptoPassWord(passWord);
    const result = await this.db.collection('users').findOne({
      email,
      passWord: password,
      status: EstatusUser.ACTIVE,
    });
    return result;
  }

  async getAllUsers(query: UsersFillterDto) {
    const { searchKey, limit, page, role, status } = query;
    const match: Record<string, any> = { $match: {} };
    if (role) {
      match.$match.role = role;
    }
    if (status) {
      match.$match.status = status;
    }
    let aggregate: any[] = [];
    const lookup = {
      $lookup: {
        from: 'profiles',
        localField: '_id',
        foreignField: 'user',
        as: 'profile',
      },
    };
    aggregate = [...aggregate, match, lookup, { $unwind: '$profile' }];
    if (searchKey) {
      aggregate = [
        ...aggregate,
        {
          $match: {
            $or: [
              {
                'user.firstName': new RegExp(searchKey),
                'user.lastName': new RegExp(searchKey),
              },
            ],
          },
        },
      ];
    }
    if (limit && page) {
      aggregate = [
        ...aggregate,
        {
          $skip: Number(limit) * Number(page) - Number(limit),
        },
        { $limit: Number(limit) },
      ];
    }

    const cursorAgg = await this.db.collection('users').aggregate(aggregate);
    const result = await cursorAgg?.toArray();
    return result;
  }

  async findUserById(id: string): Promise<any> {
    const cursorAggregate = await this.db.collection('users').aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: '_id',
          foreignField: 'user',
          as: 'profile',
        },
      },
      { $unwind: '$profile' },
    ]);
    const result = await cursorAggregate?.toArray();
    return result[0] ?? {};
  }
}
