import { Types } from 'mongoose';

export type TFood = {
  foodName: string;
  storeId: Types.ObjectId;
  image: string;
  price: number;
  regularPrice: number;
  offer: boolean;
  description: string;
  offerPercentage: number;
  offerPrice: number;
  category: string;
  video: string;
  nutrition?: string;
  menuType?: 'recommended' | 'quickMenu';
  is_recommended?: boolean;
  is_quickMenu?: boolean;
};
