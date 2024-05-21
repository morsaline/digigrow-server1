import { z } from 'zod';

const CategoryValidationSchema = z.object({
  body: z.object({
    categories: z.array(z.string()),
    storeId: z.string(),
  }),
});

export const CategoryValiations = {
  CategoryValidationSchema,
};
