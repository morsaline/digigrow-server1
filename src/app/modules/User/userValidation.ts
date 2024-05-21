import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

const userValidationSchema = z.object({
  password: z.string(),
  storeId: z
    .string()
    .refine(value => isValidObjectId(value))
    .optional(),
  isDeleted: z.boolean().default(false),
  needsPasswordChange: z.boolean().default(true),
});

export const userValidations = {
  userValidationSchema,
};
