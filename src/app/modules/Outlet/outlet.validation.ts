import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

// Define Zod schema for TTable
export const TableValudationSchema = z.object({
  tableId: z.number(),
  qrCode: z.string(),
});

// Define Zod schema for TOulet
export const OutletValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    store: z.string().refine(value => isValidObjectId(value)), // Assuming 'store' is a Store generatedUnique Id,
    storeId: z.string(),
    admin: z.string().optional(),
  }),
});
export const UpdateOutletValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    store: z
      .string()
      .refine(value => isValidObjectId(value))
      .optional(), // Assuming 'store' is a Store generatedUnique Id,
    storeId: z.string().optional(),
    admin: z.string().optional(),
  }),
});

export const OutletValidations = {
  OutletValidationSchema,
  UpdateOutletValidationSchema,
};
