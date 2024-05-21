import { Types } from 'mongoose';

export type TCategory = {
  categories: string[];
  storeId: Types.ObjectId;
};
