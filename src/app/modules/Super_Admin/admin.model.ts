import { Schema, model } from 'mongoose';
import { ISuperAdmin } from './admin.interface';

const StoreAdminSchema = new Schema<ISuperAdmin>({
  userId: { type: String, required: true },
  user: { type: 'ObjectId', ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
});

const SuperAdmin = model<ISuperAdmin>('SuperAdmin', StoreAdminSchema);

export default SuperAdmin;
