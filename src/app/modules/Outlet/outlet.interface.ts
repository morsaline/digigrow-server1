import { Types } from 'mongoose';

export type TTable = {
  tableId: string;
  qrCode: string;
};

export type TOulet = {
  name: string;
  store: Types.ObjectId;
  storeId: string;
  admin: Types.ObjectId;
  tables: TTable[];
};
