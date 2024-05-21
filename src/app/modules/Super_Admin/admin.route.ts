import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SuperAdminController } from './admin.controller';
import { SuperAdminValidation } from './admin.validation';

const router = express.Router();

router.get('/', SuperAdminController.getAllAdmins);

router.get('/:id', SuperAdminController.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(SuperAdminValidation.UpdateSuperAdminSchema),
  SuperAdminController.updateAdmin,
);

router.delete('/:id', SuperAdminController.deleteAdmin);

export const SuperAdminRoutes = router;
