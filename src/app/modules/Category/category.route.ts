import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValiations } from './category.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('store_admin'),
  validateRequest(CategoryValiations.CategoryValidationSchema),
  CategoryController.createCategory,
);

router.get(
  '/',
  auth('store_admin', 'super_admin', 'staff'),
  CategoryController.getStoreCategory,
);

// router.delete('/:id', CategoryController.deleteCategory);

export const CategoryRoutes = router;
