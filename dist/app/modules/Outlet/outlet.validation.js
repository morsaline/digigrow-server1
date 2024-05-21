"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletValidations = exports.UpdateOutletValidationSchema = exports.OutletValidationSchema = exports.TableValudationSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Define Zod schema for TTable
exports.TableValudationSchema = zod_1.z.object({
    tableId: zod_1.z.number(),
    qrCode: zod_1.z.string(),
});
// Define Zod schema for TOulet
exports.OutletValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        store: zod_1.z.string().refine(value => (0, mongoose_1.isValidObjectId)(value)), // Assuming 'store' is a Store generatedUnique Id,
        storeId: zod_1.z.string(),
        admin: zod_1.z.string().optional(),
    }),
});
exports.UpdateOutletValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        store: zod_1.z
            .string()
            .refine(value => (0, mongoose_1.isValidObjectId)(value))
            .optional(), // Assuming 'store' is a Store generatedUnique Id,
        storeId: zod_1.z.string().optional(),
        admin: zod_1.z.string().optional(),
    }),
});
exports.OutletValidations = {
    OutletValidationSchema: exports.OutletValidationSchema,
    UpdateOutletValidationSchema: exports.UpdateOutletValidationSchema,
};
