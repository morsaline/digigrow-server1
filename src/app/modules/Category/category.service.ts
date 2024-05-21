import { Request } from 'express';
import { TCategory } from './category.interface';
import Category from './category.model';
import { ExtendedJwtPayload } from '../../interface';
import StoreAdmin from '../Store_Admin/admin.model';

const createFoodCategoryIntoDB = async (payload: TCategory) => {
  const { categories, storeId } = payload;

  // Find the category by storeId
  const existingCategory = await Category.findOne({ storeId });

  // If category doesn't exist for this storeId, create a new one
  let result;
  if (!existingCategory) {
    result = await Category.create(payload);
  } else {
    // If category exists, push the new categories to the existing array
    result = await Category.findOneAndUpdate(
      { storeId },
      { $push: { categories: { $each: categories } } },
      { new: true },
    );
  }

  return result;
};

const findStoreFoodCategory = async (req: Request) => {
  const { userId, role } = req.user as ExtendedJwtPayload;
  let categories;
  if (role === 'store_admin') {
    const storeAdmin = await StoreAdmin.findById(userId);
    categories = await Category.findOne({ storeId: storeAdmin?.store });
  } else {
    categories = null;
  }

  return categories;
};

// const deleteCategoryFromDB = async (id: string) => {
//   const deletedCategory = await Category.findOneAndUpdate({});
//   return deletedCategory;
// };

export const categoryServices = {
  createFoodCategoryIntoDB,
  findStoreFoodCategory,
  // deleteCategoryFromDB,
};
