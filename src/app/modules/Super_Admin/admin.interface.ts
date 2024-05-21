import { Types } from 'mongoose';

export type ISuperAdmin = {
  userId: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  contactNo: string;
};
