"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValiations = void 0;
const zod_1 = require("zod");
const CategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        categories: zod_1.z.array(zod_1.z.string()),
        storeId: zod_1.z.string(),
    }),
});
exports.CategoryValiations = {
    CategoryValidationSchema,
};
