"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const FoodSchema = new mongoose_1.Schema({
    foodName: { type: String, required: true },
    storeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Store', required: true },
    image: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    offer: { type: Boolean, required: true, default: false },
    offerPercentage: { type: Number, required: true, default: null },
    offerPrice: { type: Number, required: true, default: null },
    category: { type: String, required: true },
    video: { type: String },
    description: { type: String },
    nutrition: { type: String },
    menuType: {
        type: String,
        enum: ['recommended', 'quickMenu', 'default'],
        default: false,
    },
    is_recommended: { type: Boolean },
    is_quickMenu: { type: Boolean },
}, { timestamps: true });
const Food = mongoose_1.default.model('Food', FoodSchema);
exports.default = Food;
