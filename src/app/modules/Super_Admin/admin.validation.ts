import { z } from 'zod';

const SuperAdminValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    data: z.object({
      name: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
    }),
  }),
});

const UpdateSuperAdminSchema = z.object({
  body: z.object({
    data: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
    }),
  }),
});

export const SuperAdminValidation = {
  SuperAdminValidationSchema,
  UpdateSuperAdminSchema,
};
