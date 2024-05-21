import { z } from 'zod';

const StoreValidationSchema = z.object({
  body: z.object({
    storeName: z.string(),
    location: z.string().optional(),
    availability: z.string().optional(),
    // Assuming storeAdmin is a string identifier
    storeBanner: z.string().optional(),
    storeLogo: z.string().optional(),
    hotline: z.string().optional(),
  }),
});

const UpdateStoreValidationSchema = z.object({
  body: z.object({
    storeName: z.string().optional(),
    location: z.string().optional(),
    availability: z.string().optional(),
    // Assuming storeAdmin is a string identifier
    storeBanner: z.string().optional(),
    storeLogo: z.string().optional(),
    hotline: z.string().optional(),
  }),
});

export const StoreValidations = {
  StoreValidationSchema,
  UpdateStoreValidationSchema,
};
