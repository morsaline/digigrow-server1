"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const outletSchema = new mongoose_1.Schema({
    categories: {
        type: [String],
        required: true,
    },
    storeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
});
const Category = (0, mongoose_1.model)('Category', outletSchema);
exports.default = Category;
