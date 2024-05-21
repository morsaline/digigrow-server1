import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StoreValidations } from './store.validation';
import { StoreControllers } from './store.controller';
import { uploader } from '../../utils/sendImageToCloudinary';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-store',
  validateRequest(StoreValidations.StoreValidationSchema),
  StoreControllers.createStore,
);

router.get('/:id', auth('super_admin'), StoreControllers.getSingleStore);

router.put(
  '/update-store/:id',
  uploader.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  (req, res, next) => {
    req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
    next();
  },
  validateRequest(StoreValidations.UpdateStoreValidationSchema),

  StoreControllers.updateStore,
);

router.get(
  '/',
  auth('store_admin', 'super_admin', 'all'),
  StoreControllers.getStore,
);

export const StoreRoutes = router;
