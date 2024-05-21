import httpStatus from 'http-status';
import catchAsync from '../../utils/cathAsync';
import sendResponse from '../../utils/sendResponse';
import { storeServices } from './store.service';

/**
 * Create a new store
 * @function
 * @async
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
const createStore = catchAsync(async (req, res) => {
  const result = await storeServices.createStoreIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store created succesfully',
    data: result,
  });
});

/**
 * Update an existing store
 * @function
 * @async
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
const updateStore = catchAsync(async (req, res) => {
  const result = await storeServices.updateStoreIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store updated succesfully',
    data: result,
  });
});
const getStore = catchAsync(async (req, res) => {
  const result = await storeServices.getStoreFromDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store retrieved successfully',
    data: result,
  });
});

const getSingleStore = catchAsync(async (req, res) => {
  const result = await storeServices.getSingleStoreFormDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store retrieved successfully',
    data: result,
  });
});

export const StoreControllers = {
  createStore,
  updateStore,
  getStore,
  getSingleStore,
};
