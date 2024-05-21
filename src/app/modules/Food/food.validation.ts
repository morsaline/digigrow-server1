import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const FoodValidationSchema = z.object({
  body: z.object({
    foodName: z.string(),
    storeId: z.string().refine(value => isValidObjectId(value)),
    regularPrice: z.number(),
    offer: z.boolean(),
    offerPercentage: z.number().optional(),
    offerPrice: z.number().optional(),
    category: z.string(),
    description: z.string(),
    video: z.string().optional(),
    nutrition: z.string().optional(),
    is_recommended: z.boolean().optional(),
    is_quickMenu: z.boolean().optional(),
    menuType: z.enum(['recommended', 'quickMenu', 'default']).optional(),
  }),
});

export const updateFoodValidationSchema = z.object({
  body: z.object({
    foodName: z.string().optional(),
    storeId: z
      .string()
      .refine(value => isValidObjectId(value))
      .optional(),
    image: z.string().optional(),
    regularPrice: z.number().optional(),
    offer: z.boolean().optional(),
    offerPercentage: z.number().nullable().optional(),
    offerPrice: z.number().nullable().optional(),
    category: z.string().optional(),
    video: z.string().url().optional().nullable(),
    nutrition: z.string().optional().nullable(),
    is_recommended: z.boolean().optional(),
    is_quickMenu: z.boolean().optional(),
  }),
});

export const FoodValidations = {
  FoodValidationSchema,
  updateFoodValidationSchema,
};
