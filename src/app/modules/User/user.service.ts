import mongoose from 'mongoose';
import { TStoreAdmin } from '../Store_Admin/admin.interface';
import { AppError } from '../../errors/AppError';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import StoreAdmin from '../Store_Admin/admin.model';
import { generateStoreAdminId, generateSuperAdminId } from './user.utils';
import SuperAdmin from '../Super_Admin/admin.model';
import { ISuperAdmin } from '../Super_Admin/admin.interface';
import { Store } from '../Store/store.model';

const createStoreAdminIntoDB = async (
  payload: TStoreAdmin,
  password: string,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set store admin role
  userData.role = 'store_admin';
  userData.id = await generateStoreAdminId();
  userData.email = payload.email;

  const isStoreHasAdmin = await Store.findOne({ _id: payload.store });
  if (isStoreHasAdmin?.storeAdmin) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This store already has a store admin',
    );
  }

  // find academic department info
  const isAdminExistWithEmail = await User.findOne({ email: payload.email });
  if (isAdminExistWithEmail?.email) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User already exists with this email adress',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const isAdminExistsWithEmail = await StoreAdmin.findOne({
      email: payload.email,
    });

    if (isAdminExistsWithEmail?.email) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Admin already exists with this email adress',
      );
    }
    // set id , _id as user
    payload.userId = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a store admin (transaction-2)

    const newStoreAdmin = await StoreAdmin.create([payload], { session });
    if (!newStoreAdmin.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create Store Admin',
      );
    }

    const isAdminExistsInStore = await Store.findById(payload.store);

    if (!isAdminExistsInStore?.storeAdmin) {
      const updatedStore = await Store.findByIdAndUpdate(
        payload.store,
        { storeAdmin: newStoreAdmin[0]._id, adminId: newStoreAdmin[0].userId },
        { session },
      );
      if (!updatedStore) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to create Store Admin',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    return newStoreAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createSuperAdminIntoDB = async (
  payload: ISuperAdmin,
  password: string,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password

  //set store admin role
  userData.role = 'super_admin';
  userData.id = await generateSuperAdminId();
  userData.password = password;
  userData.email = payload.email;

  // find academic department info

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const isAdminExistsWithEmail = await SuperAdmin.findOne({
      email: payload.email,
    });

    if (isAdminExistsWithEmail?.email) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Admin already exists with this email adress',
      );
    }
    // set id , _id as user
    payload.userId = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a store admin (transaction-2)

    const newStoreAdmin = await SuperAdmin.create([payload], { session });

    if (!newStoreAdmin.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create Super Admin',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStoreAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStoreAdminIntoDB,
  createSuperAdminIntoDB,
};
