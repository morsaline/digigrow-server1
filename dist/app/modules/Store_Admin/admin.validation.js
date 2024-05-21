"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreAdminValidations = exports.updateStoreAdminValidationSchema = exports.storeAdminValidationSchema = void 0;
const zod_1 = require("zod");
exports.storeAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        data: zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
            contactNo: zod_1.z.string(),
            storeId: zod_1.z.string().optional(),
        }),
    }),
});
exports.updateStoreAdminValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    contactNo: zod_1.z.string().optional(),
    storeId: zod_1.z.string().optional(),
});
exports.StoreAdminValidations = {
    updateStoreAdminValidationSchema: exports.updateStoreAdminValidationSchema,
    storeAdminValidationSchema: exports.storeAdminValidationSchema,
};
