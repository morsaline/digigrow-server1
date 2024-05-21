import { Request, Response } from 'express';
import { TOulet, TTable } from './outlet.interface';
import Outlet from './outlet.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { deleteImages } from '../../utils/deleteImages';
import StoreAdmin from '../Store_Admin/admin.model';

/**
 * Create an outlet in the database.
 * @param {Partial<TOulet>} payload - Partial outlet data.
 * @returns {Promise<object>} Created outlet object.
 */
const createOutLetIntoDB = async (payload: Partial<TOulet>) => {
  const outlet = await Outlet.create(payload);
  return outlet;
};

const getOutletsFromDB = async (req: Request) => {
  const user = req.user;
  let outlets;
  if (user?.role === 'store_admin') {
    const storeAdmin = await StoreAdmin.findById(user.userId);

    outlets = await Outlet.find({ store: storeAdmin?.store });
  } else if (user?.role === 'super_admin') {
    outlets = await Outlet.find({});
  }

  return outlets;
};

const getSingleOutLetFromDB = async (id: string) => {
  const outlet = await Outlet.findById(id);
  return outlet;
};
/**
 * Create a table in an outlet.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<object>} Updated outlet object.
 */
const createTableInOutlet = async (req: Request, res: Response) => {
  // eslint-disable-next-line no-unused-vars
  const { outletId } = req.params;
  const { tableNumber } = req.body;

  const table: TTable = {
    tableId: tableNumber,
    qrCode: res.locals.qrCodeFilePath,
  };

  const isTableAlreadyExists = await Outlet.findOne({
    _id: outletId,
    'tables.tableId': tableNumber,
  });

  if (isTableAlreadyExists) {
    // Find the index of the "qr_code/" segment
    const qrCodeUrl = res.locals.qrCodeFilePath;
    const qrCodeIndex = qrCodeUrl.indexOf('qr_code/');
    // Extract the substring after "qr_code/"
    const qrCodeSegment = qrCodeUrl.substring(qrCodeIndex + 8);
    deleteImages([qrCodeSegment], 'qr_code');
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'table already exists with this id',
    );
  }

  const outlet = await Outlet.findByIdAndUpdate(
    outletId,
    { $push: { tables: table } },
    { new: true },
  );

  if (!outlet) {
    // Find the index of the "qr_code/" segment
    const qrCodeUrl = res.locals.qrCodeFilePath;
    const qrCodeIndex = qrCodeUrl.indexOf('qr_code/');
    // Extract the substring after "qr_code/"
    const qrCodeSegment = qrCodeUrl.substring(qrCodeIndex + 8);
    deleteImages([qrCodeSegment], 'qr_code');

    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Couldn't update, please try again",
    );
  }

  return outlet;
};

/**
 * Delete a table from an outlet.
 * @param {string} outletId - Outlet ID.
 * @param {string} tableId - Table ID.
 * @returns {Promise<object>} Updated outlet object.
 */
const deleteTableFromOutlet = async (outletId: string, tableId: string) => {
  const outlet = await Outlet.findOneAndUpdate(
    { _id: outletId, 'tables.tableId': tableId },
    { $pull: { tables: { tableId } } },
  );

  if (!outlet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Table not found');
  }

  const qr_code = outlet.tables.find(table => table.tableId === tableId);

  if (qr_code) {
    // Delete associated QR code images
    const qrCodeIndex = qr_code?.qrCode?.indexOf('qr_code/');
    // Extract the substring after "qr_code/"
    const qrCodeSegment = qr_code?.qrCode.substring(qrCodeIndex + 8);

    deleteImages([qrCodeSegment], 'qr_code');
  }

  return outlet;
};

/**
 * Delete an outlet from the database.
 * @param {string} id - Outlet ID.
 * @returns {Promise<object>} Deleted outlet object.
 */
const deleteOutletFromDB = async (id: string) => {
  const outlet = await Outlet.findByIdAndDelete(id);
  if (!outlet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Outlet not found');
  }

  const qr_codes = [...outlet.tables].map(table => {
    const qrCodeIndex = table?.qrCode?.indexOf('qr_code/');
    // Extract the substring after "qr_code/"
    const qrCodeSegment = table?.qrCode.substring(qrCodeIndex + 8);
    return qrCodeSegment;
  });

  deleteImages([...qr_codes], 'qr_code');

  return outlet;
};

export const outletServices = {
  createOutLetIntoDB,
  createTableInOutlet,
  deleteTableFromOutlet,
  deleteOutletFromDB,
  getOutletsFromDB,
  getSingleOutLetFromDB,
};
