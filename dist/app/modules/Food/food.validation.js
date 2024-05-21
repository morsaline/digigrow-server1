"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodValidations = exports.updateFoodValidationSchema = exports.FoodValidationSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.FoodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        foodName: zod_1.z.string(),
        storeId: zod_1.z.string().refine(value => (0, mongoose_1.isValidObjectId)(value)),
        regularPrice: zod_1.z.number(),
        offer: zod_1.z.boolean(),
        offerPercentage: zod_1.z.number().optional(),
        offerPrice: zod_1.z.number().optional(),
        category: zod_1.z.string(),
        description: zod_1.z.string(),
        video: zod_1.z.string().optional(),
        nutrition: zod_1.z.string().optional(),
        is_recommended: zod_1.z.boolean().optional(),
        is_quickMenu: zod_1.z.boolean().optional(),
        menuType: zod_1.z.enum(['recommended', 'quickMenu', 'default']).optional(),
    }),
});
exports.updateFoodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        foodName: zod_1.z.string().optional(),
        storeId: zod_1.z
            .string()
            .refine(value => (0, mongoose_1.isValidObjectId)(value))
            .optional(),
        image: zod_1.z.string().optional(),
        regularPrice: zod_1.z.number().optional(),
        offer: zod_1.z.boolean().optional(),
        offerPercentage: zod_1.z.number().nullable().optional(),
        offerPrice: zod_1.z.number().nullable().optional(),
        category: zod_1.z.string().optional(),
        video: zod_1.z.string().url().optional().nullable(),
        nutrition: zod_1.z.string().optional().nullable(),
        is_recommended: zod_1.z.boolean().optional(),
        is_quickMenu: zod_1.z.boolean().optional(),
    }),
});
exports.FoodValidations = {
    FoodValidationSchema: exports.FoodValidationSchema,
    updateFoodValidationSchema: exports.updateFoodValidationSchema,
};
