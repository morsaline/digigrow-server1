import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { StoreAdminValidations } from '../Store_Admin/admin.validation';
import { userControllers } from './user.controller';
import { SuperAdminValidation } from '../Super_Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-store-admin',
  validateRequest(StoreAdminValidations.storeAdminValidationSchema),
  userControllers.createStoreAdmin,
);
router.post(
  '/create-super-admin',
  validateRequest(SuperAdminValidation.SuperAdminValidationSchema),
  userControllers.createSuperAdmin,
);

export const UserRoutes = router;
