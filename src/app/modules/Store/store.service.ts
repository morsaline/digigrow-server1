/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TStore } from './store.interface';
import { Store } from './store.model';
import { generateStoreId } from './store.utils';
import { Request } from 'express';
import { deleteImages } from '../../utils/deleteImages';
import config from '../../config';
import { ExtendedJwtPayload } from '../../interface';

const createStoreIntoDB = async (payload: TStore) => {
  const storeId = await generateStoreId(payload.storeName);
  payload.storeId = storeId;

  const isStoreExistWithId = await Store.findOne({ storeId });

  if (isStoreExistWithId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Internal Error, Please create another request',
    );
  }
  const store = await Store.create(payload);
  return store;
};

const getSingleStoreFormDB = async (id: string) => {
  const result = await Store.findById(id);
  return result;
};

/**
 * Update store information in the database
 * @param {Request} req - The Express Request object
 * @returns {Promise<TStore>} - The updated store information
 * @throws {AppError} - If there is an error during the update process
 */
const updateStoreIntoDB = async (req: Request): Promise<TStore> => {
  const { id: storeId } = req.params;
  const payload: Partial<TStore> = req.body; // payload from the request

  if (req.logo) {
    //@ts-expect-error
    payload.storeLogo = `${config.base_url}/uploads/${req.files['logo'][0].filename}`;
  }

  if (req.banner) {
    //@ts-expect-error
    payload.storeBanner = `${config.base_url}/uploads/${req.files['banner'][0].filename}`;
  }

  const isStoreExistWith = await Store.findOne({ _id: storeId });
  if (!isStoreExistWith) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Couldn"t find store with id ' + storeId,
    );
  }

  const updatedStore = await Store.findOneAndUpdate({ _id: storeId }, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedStore) {
    //@ts-expect-error
    const logo = req.logo ? req.files['logo'][0].filename : null;
    //@ts-expect-error
    const banner = req.banner ? req.files['banner'][0].filename : null;

    if (banner) {
      deleteImages([banner], 'uploads');
    }
    if (logo) {
      deleteImages([logo], 'uploads');
    }
    throw new AppError(httpStatus.BAD_REQUEST, "Couldn't update to store");
  }

  // return updatedStore
  return updatedStore as TStore;
};

const getStoreFromDB = async (req: Request) => {
  let userId;
  let role;
  if (req.user) {
    const user = req.user as ExtendedJwtPayload;
    userId = user.userId;
    role = user.role;
  }
  const { storeId } = req.query;

  let data;

  if (role === 'super_admin') {
    data = await Store.find({});
  } else if (role === 'store_admin') {
    data = await Store.findOne({ storeAdmin: userId });
  } else if (storeId) {
    data = await Store.findById(storeId);
  } else {
    data = null;
  }

  return data;
};

export const storeServices = {
  createStoreIntoDB,
  updateStoreIntoDB,
  getStoreFromDB,
  getSingleStoreFormDB,
};
