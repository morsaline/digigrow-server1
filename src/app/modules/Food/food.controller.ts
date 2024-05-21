import httpStatus from 'http-status';
import catchAsync from '../../utils/cathAsync';
import { foodServices } from './food.service';
import sendResponse from '../../utils/sendResponse';

const createFood = catchAsync(async (req, res) => {
  const result = await foodServices.createfoodIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Food added succesfully',
    data: result,
  });
});

const getStoreFoods = catchAsync(async (req, res) => {
  const result = await foodServices.getFoodsForStore(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Foods retrieved successfully',
    data: result,
  });
});

const updateFood = catchAsync(async (req, res) => {
  const result = await foodServices.updateStoreFood(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Food updated successfully',
    data: result,
  });
});

const deleteFood = catchAsync(async (req, res) => {
  const { foodId } = req.params;
  const result = await foodServices.deleteFoodFromDB(foodId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Food deleted successfully',
    data: result,
  });
});

const getFoods = catchAsync(async (req, res) => {
  const result = await foodServices.getFoodsFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Foods retrieved successfully',
    data: result,
  });
});

export const foodControllers = {
  createFood,
  getStoreFoods,
  updateFood,
  getFoods,
  deleteFood,
};
