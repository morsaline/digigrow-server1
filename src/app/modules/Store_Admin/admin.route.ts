import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { updateStoreAdminValidationSchema } from './admin.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth('super_admin'), AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateStoreAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.deleteAdmin);

export const StoreAdminRoutes = router;
