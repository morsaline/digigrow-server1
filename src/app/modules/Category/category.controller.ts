import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.service';
import catchAsync from '../../utils/cathAsync';

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createFoodCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created succesfully',
    data: result,
  });
});

const getStoreCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.findStoreFoodCategory(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved succesfully',
    data: result,
  });
});
// const deleteCategory = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await categoryServices.findStoreFoodCategory(id as string);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category retrieved succesfully',
//     data: result,
//   });
// });

export const CategoryController = {
  createCategory,
  getStoreCategory,
  // deleteCategory,
};
