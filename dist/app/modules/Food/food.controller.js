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
exports.foodControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cathAsync_1 = __importDefault(require("../../utils/cathAsync"));
const food_service_1 = require("./food.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createFood = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield food_service_1.foodServices.createfoodIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Food added succesfully',
        data: result,
    });
}));
const getStoreFoods = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield food_service_1.foodServices.getFoodsForStore(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Foods retrieved successfully',
        data: result,
    });
}));
const updateFood = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield food_service_1.foodServices.updateStoreFood(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Food updated successfully',
        data: result,
    });
}));
const deleteFood = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodId } = req.params;
    const result = yield food_service_1.foodServices.deleteFoodFromDB(foodId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Food deleted successfully',
        data: result,
    });
}));
const getFoods = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield food_service_1.foodServices.getFoodsFromDb();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Foods retrieved successfully',
        data: result,
    });
}));
exports.foodControllers = {
    createFood,
    getStoreFoods,
    updateFood,
    getFoods,
    deleteFood,
};
