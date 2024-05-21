"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tebleScheam = new mongoose_1.Schema({
    qrCode: {
        type: String,
        required: true,
    },
    tableId: {
        type: String,
        required: true,
    },
});
const outletSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },
    storeId: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'StoreAdmin',
        required: true,
    },
    tables: {
        type: [tebleScheam],
        default: [],
    },
});
const Outlet = (0, mongoose_1.model)('Outlet', outletSchema);
exports.default = Outlet;
