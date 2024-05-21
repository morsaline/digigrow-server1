import { Schema, model } from 'mongoose';
import { TStoreAdmin } from './admin.interface';

const StoreAdminSchema = new Schema<TStoreAdmin>(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
    userId: { type: 'String', required: true, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: { type: String, required: true },
    store: { type: 'ObjectId', ref: 'Store', default: null },
    storeId: { type: 'String', default: null },
    storeName: {
      type: String,
      required: true,
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const StoreAdmin = model<TStoreAdmin>('StoreAdmin', StoreAdminSchema);

export default StoreAdmin;
