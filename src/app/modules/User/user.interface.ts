/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TRole = 'store_admin' | 'super_admin' | 'staff' | 'all';
export type TStatus = 'active' | 'in-active' | 'blocked';

export type TUser = {
  id: string;
  password: string;
  email: string;
  role: TRole;
  isDeleted: boolean;
  status: TStatus;
  needsPasswordChange: boolean;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsById(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
