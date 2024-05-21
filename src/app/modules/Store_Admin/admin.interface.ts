import { Types } from 'mongoose';

export interface TStoreAdmin {
  _id?: string;
  userId: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  contactNo: string;
  storeId: string;
  store: Types.ObjectId;
  storeName: string;
  isDeleted: boolean;
}
