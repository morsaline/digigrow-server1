import { Request } from 'express';
import { TFood } from './food.interface';
import Food from './food.model';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { ExtendedJwtPayload } from '../../interface';
import StoreAdmin from '../Store_Admin/admin.model';

const createfoodIntoDB = async (req: Request) => {
  const payload: TFood = req.body;

  if (req.file) {
    payload.image = `${config.base_url}/uploads/${req.file?.filename}`;
  }
  const food = await Food.create(payload);
  return food;
};

const getFoodsForStore = async (req: Request) => {
  let userId;
  let role;
  if (req.user) {
    const user = req.user as ExtendedJwtPayload;
    userId = user.userId;
    role = user.role;
  }
  const { storeId } = req.query;
  let foods;
  if (role === 'store_admin') {
    const storeAdmin = await StoreAdmin.findById(userId);
    foods = await Food.find({ storeId: storeAdmin?.store });
  } else if (role === 'super_admin') {
    foods = await Food.find({});
  } else if (storeId) {
    foods = await Food.find({ storeId });
  } else {
    foods = null;
  }

  return foods;
};

const updateStoreFood = async (req: Request) => {
  const { foodId } = req.params;
  const foodData: Partial<TFood> = req.body;

  const isFoodExist = await Food.findById(foodId);

  if (!isFoodExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'food does not exist');
  }

  if (req.file) {
    foodData.image = `${config.base_url}/uploads/${req.file.filename}`;
  }

  const food = await Food.findByIdAndUpdate(foodId, foodData, { new: true });
  return food;
};

const deleteFoodFromDB = async (id: string) => {
  const deletedFood = await Food.findByIdAndDelete(id);

  return deletedFood;
};

const getFoodsFromDb = async () => {
  const foods = await Food.find({});

  return foods;
};

export const foodServices = {
  createfoodIntoDB,
  getFoodsForStore,
  updateStoreFood,
  getFoodsFromDb,
  deleteFoodFromDB,
};
