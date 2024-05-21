"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StoreAdminSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    user: { type: 'ObjectId', ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
});
const SuperAdmin = (0, mongoose_1.model)('SuperAdmin', StoreAdminSchema);
exports.default = SuperAdmin;
