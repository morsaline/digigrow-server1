import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OutletValidations } from './outlet.validation';
import { outletControllers } from './outlet.controller';
import qrCode from '../../middlewares/generateQrCode';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-outlet',
  validateRequest(OutletValidations.OutletValidationSchema),
  outletControllers.createOutlet,
);

router.put(
  '/create-table/:storeId/:outletId',
  qrCode,
  outletControllers.createTable,
);

router.get(
  '/',
  auth('store_admin', 'super_admin'),
  outletControllers.getOutlets,
);
router.get(
  '/:id',
  auth('store_admin', 'super_admin'),
  outletControllers.getSingleOutlet,
);
router.delete(
  '/delete-table/:outletId/:tableId',
  outletControllers.deleteTable,
);

router.delete('/delete-outlet/:outletId', outletControllers.deleteOutlet);

export const OutletRoutes = router;
