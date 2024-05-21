"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    storeId: {
        type: String,
        required: true,
        unique: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    availability: {
        type: String,
        // required: true,
    },
    storeAdmin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for storeAdmin
        // required: true,
    },
    adminId: {
        type: String,
        // required: true,
    },
    storeBanner: {
        type: String,
        // required: true,
    },
    categories: {
        type: [String],
        // required: true,
        default: [],
    },
    storeLogo: {
        type: String,
        // required: true,
    },
    hotline: {
        type: String,
        // required: true,
    },
    status: {
        type: String,
        enum: ['active', 'in-active', 'blocked'],
        default: 'active',
    },
    tags: {
        type: [String],
        // required: true,
        default: [],
    },
});
exports.Store = (0, mongoose_1.model)('Store', storeSchema);
