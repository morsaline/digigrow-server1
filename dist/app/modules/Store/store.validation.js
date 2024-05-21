"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreValidations = void 0;
const zod_1 = require("zod");
const StoreValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        storeName: zod_1.z.string(),
        location: zod_1.z.string().optional(),
        availability: zod_1.z.string().optional(),
        // Assuming storeAdmin is a string identifier
        storeBanner: zod_1.z.string().optional(),
        storeLogo: zod_1.z.string().optional(),
        hotline: zod_1.z.string().optional(),
    }),
});
const UpdateStoreValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        storeName: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        availability: zod_1.z.string().optional(),
        // Assuming storeAdmin is a string identifier
        storeBanner: zod_1.z.string().optional(),
        storeLogo: zod_1.z.string().optional(),
        hotline: zod_1.z.string().optional(),
    }),
});
exports.StoreValidations = {
    StoreValidationSchema,
    UpdateStoreValidationSchema,
};
