"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StoreAdminSchema = new mongoose_1.Schema({
    user: {
        type: 'ObjectId',
        ref: 'User',
        required: true,
    },
    userId: { type: 'String', required: true, unique: true },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: { type: String, required: true },
    store: { type: 'ObjectId', ref: 'Store', default: null },
    storeId: { type: 'String', default: null },
    storeName: {
        type: String,
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const StoreAdmin = (0, mongoose_1.model)('StoreAdmin', StoreAdminSchema);
exports.default = StoreAdmin;
