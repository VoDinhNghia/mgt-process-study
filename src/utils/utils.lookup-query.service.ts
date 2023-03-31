import { collections } from 'src/constants/constants.collections.name';
import { lookupCommon } from './utils.lookup-common';

export function userLookup() {
  const lookup = lookupCommon([
    {
      from: collections.profiles,
      localField: '_id',
      foreignField: 'user',
      as: 'profile',
      unwind: true,
    },
  ]);
  return lookup;
}

export function profileLookup() {
  const lookup = lookupCommon([
    {
      from: collections.profiles,
      localField: 'user',
      foreignField: '_id',
      as: 'profile',
      unwind: true,
    },
  ]);
  return lookup;
}
