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
exports.StoreControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cathAsync_1 = __importDefault(require("../../utils/cathAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const store_service_1 = require("./store.service");
/**
 * Create a new store
 * @function
 * @async
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
const createStore = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_service_1.storeServices.createStoreIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Store created succesfully',
        data: result,
    });
}));
/**
 * Update an existing store
 * @function
 * @async
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
const updateStore = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_service_1.storeServices.updateStoreIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Store updated succesfully',
        data: result,
    });
}));
const getStore = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_service_1.storeServices.getStoreFromDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Store retrieved successfully',
        data: result,
    });
}));
const getSingleStore = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_service_1.storeServices.getSingleStoreFormDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Store retrieved successfully',
        data: result,
    });
}));
exports.StoreControllers = {
    createStore,
    updateStore,
    getStore,
    getSingleStore,
};
