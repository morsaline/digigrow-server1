import { Types } from 'mongoose';

export type TStore = {
  storeId: string;
  storeName: string;
  location: string;
  availability: string;
  storeAdmin: Types.ObjectId;
  adminId: string;
  storeBanner: string;
  storeLogo: string;
  hotline: string;
  status: 'active' | 'in-active' | 'blocked';
  categories: string[];
  tags: string[];
};
