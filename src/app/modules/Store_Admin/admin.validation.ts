import { z } from 'zod';

export const storeAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    data: z.object({
      name: z.string(),
      email: z.string(),
      contactNo: z.string(),
      storeId: z.string().optional(),
    }),
  }),
});

export const updateStoreAdminValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  contactNo: z.string().optional(),
  storeId: z.string().optional(),
});

export const StoreAdminValidations = {
  updateStoreAdminValidationSchema,
  storeAdminValidationSchema,
};
