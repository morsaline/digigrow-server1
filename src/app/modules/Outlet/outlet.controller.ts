import httpStatus from 'http-status';
import catchAsync from '../../utils/cathAsync';
import { outletServices } from './outlet.service';
import sendResponse from '../../utils/sendResponse';

/**
 * Create an outlet.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const createOutlet = catchAsync(async (req, res) => {
  const result = await outletServices.createOutLetIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Outlet created succesfully',
    data: result,
  });
});

/**
 * Create a table.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const createTable = catchAsync(async (req, res) => {
  const result = await outletServices.createTableInOutlet(req, res);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Table added succesfully',
    data: result,
  });
});

/**
 * Delete a table.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteTable = catchAsync(async (req, res) => {
  const { outletId, tableId } = req.params;
  const result = await outletServices.deleteTableFromOutlet(outletId, tableId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Table deleted succesfully',
    data: result,
  });
});

/**
 * Delete an outlet.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteOutlet = catchAsync(async (req, res) => {
  const { outletId } = req.params;
  const result = await outletServices.deleteOutletFromDB(outletId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Outlet deleted succesfully',
    data: result,
  });
});

const getOutlets = catchAsync(async (req, res) => {
  const result = await outletServices.getOutletsFromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Outlet retrived succesfully',
    data: result,
  });
});
const getSingleOutlet = catchAsync(async (req, res) => {
  const result = await outletServices.getSingleOutLetFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Outlet retrived succesfully',
    data: result,
  });
});

export const outletControllers = {
  createOutlet,
  createTable,
  deleteTable,
  deleteOutlet,
  getOutlets,
  getSingleOutlet,
};
