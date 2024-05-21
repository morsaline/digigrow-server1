import { Schema, model } from 'mongoose';
import { TStore } from './store.interface';

const storeSchema = new Schema<TStore>({
  storeId: {
    type: String,
    required: true,
    unique: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  availability: {
    type: String,
    // required: true,
  },
  storeAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for storeAdmin
    // required: true,
  },
  adminId: {
    type: String,
    // required: true,
  },
  storeBanner: {
    type: String,
    // required: true,
  },
  categories: {
    type: [String],
    // required: true,
    default: [],
  },
  storeLogo: {
    type: String,
    // required: true,
  },
  hotline: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ['active', 'in-active', 'blocked'],
    default: 'active',
  },

  tags: {
    type: [String],
    // required: true,
    default: [],
  },
});

export const Store = model<TStore>('Store', storeSchema);
