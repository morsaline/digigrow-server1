"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z.string(),
    storeId: zod_1.z
        .string()
        .refine(value => (0, mongoose_1.isValidObjectId)(value))
        .optional(),
    isDeleted: zod_1.z.boolean().default(false),
    needsPasswordChange: zod_1.z.boolean().default(true),
});
exports.userValidations = {
    userValidationSchema,
};
