import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FoodValidationSchema, FoodValidations } from './food.validation';
import { uploader } from '../../utils/sendImageToCloudinary';
import { foodControllers } from './food.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-food',

  uploader.single('image'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(FoodValidationSchema),
  foodControllers.createFood,
);

router.get(
  '/',
  auth('store_admin', 'super_admin', 'all'),
  foodControllers.getStoreFoods,
);

router.put(
  '/:foodId',
  uploader.single('image'),
  (req, res, next) => {
    req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
    next();
  },
  validateRequest(FoodValidations.updateFoodValidationSchema),
  foodControllers.updateFood,
);

router.delete(
  '/:foodId',
  auth('store_admin', 'super_admin'),
  foodControllers.deleteFood,
);

router.get('/', auth('super_admin'), foodControllers.getFoods);

export const FoodRoutes = router;
