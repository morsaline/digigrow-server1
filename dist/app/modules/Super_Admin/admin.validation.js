"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminValidation = void 0;
const zod_1 = require("zod");
const SuperAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        data: zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
        }),
    }),
});
const UpdateSuperAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        data: zod_1.z.object({
            name: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
        }),
    }),
});
exports.SuperAdminValidation = {
    SuperAdminValidationSchema,
    UpdateSuperAdminSchema,
};
