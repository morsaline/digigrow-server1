"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodServices = void 0;
const food_model_1 = __importDefault(require("./food.model"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = __importDefault(require("../Store_Admin/admin.model"));
const createfoodIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    if (req.file) {
        payload.image = `${config_1.default.base_url}/uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
    }
    const food = yield food_model_1.default.create(payload);
    return food;
});
const getFoodsForStore = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let userId;
    let role;
    if (req.user) {
        const user = req.user;
        userId = user.userId;
        role = user.role;
    }
    const { storeId } = req.query;
    let foods;
    if (role === 'store_admin') {
        const storeAdmin = yield admin_model_1.default.findById(userId);
        foods = yield food_model_1.default.find({ storeId: storeAdmin === null || storeAdmin === void 0 ? void 0 : storeAdmin.store });
    }
    else if (role === 'super_admin') {
        foods = yield food_model_1.default.find({});
    }
    else if (storeId) {
        foods = yield food_model_1.default.find({ storeId });
    }
    else {
        foods = null;
    }
    return foods;
});
const updateStoreFood = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodId } = req.params;
    const foodData = req.body;
    const isFoodExist = yield food_model_1.default.findById(foodId);
    if (!isFoodExist) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'food does not exist');
    }
    if (req.file) {
        foodData.image = `${config_1.default.base_url}/uploads/${req.file.filename}`;
    }
    const food = yield food_model_1.default.findByIdAndUpdate(foodId, foodData, { new: true });
    return food;
});
const deleteFoodFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFood = yield food_model_1.default.findByIdAndDelete(id);
    return deletedFood;
});
const getFoodsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const foods = yield food_model_1.default.find({});
    return foods;
});
exports.foodServices = {
    createfoodIntoDB,
    getFoodsForStore,
    updateStoreFood,
    getFoodsFromDb,
    deleteFoodFromDB,
};
