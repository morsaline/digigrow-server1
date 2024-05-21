import httpStatus from 'http-status';
import catchAsync from '../../utils/cathAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createStoreAdmin = catchAsync(async (req, res) => {
  const { password, data } = req.body;
  const result = await userServices.createStoreAdminIntoDB(data, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
const createSuperAdmin = catchAsync(async (req, res) => {
  const { password, data } = req.body;
  const result = await userServices.createSuperAdminIntoDB(data, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super Admin is created succesfully',
    data: result,
  });
});

export const userControllers = { createStoreAdmin, createSuperAdmin };
