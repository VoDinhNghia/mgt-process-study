import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { cryptoPassWord } from 'src/commons/crypto';
import { statusUser } from 'src/commons/constants';
import { UsersFillterDto } from './dto/user.filter.dto';
import { DbConnection } from 'src/commons/dBConnection';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbConnection) {}

  async findByEmailAndPass(email: string, passWord: string) {
    const pass = cryptoPassWord(passWord);
    const result = await this.db.collection('users').findOne({
      email,
      passWord: pass,
      status: statusUser.ACTIVE,
    });
    return result;
  }

  async findByEmail(email: string) {
    return this.db.collection('users').findOne({ email });
  }

  async getAll(query: UsersFillterDto) {
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
