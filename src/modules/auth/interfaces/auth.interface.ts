import { Types } from 'mongoose';

export interface ImatchAuth {
  $match?: {
    email: string;
    passWord: string;
    status: string;
  };
}

export interface ImatchGetMe {
  _id?: Types.ObjectId;
}
