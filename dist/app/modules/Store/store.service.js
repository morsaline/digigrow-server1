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
exports.storeServices = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const store_model_1 = require("./store.model");
const store_utils_1 = require("./store.utils");
const deleteImages_1 = require("../../utils/deleteImages");
const config_1 = __importDefault(require("../../config"));
const createStoreIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const storeId = yield (0, store_utils_1.generateStoreId)(payload.storeName);
    payload.storeId = storeId;
    const isStoreExistWithId = yield store_model_1.Store.findOne({ storeId });
    if (isStoreExistWithId) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Internal Error, Please create another request');
    }
    const store = yield store_model_1.Store.create(payload);
    return store;
});
const getSingleStoreFormDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_model_1.Store.findById(id);
    return result;
});
/**
 * Update store information in the database
 * @param {Request} req - The Express Request object
 * @returns {Promise<TStore>} - The updated store information
 * @throws {AppError} - If there is an error during the update process
 */
const updateStoreIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: storeId } = req.params;
    const payload = req.body; // payload from the request
    if (req.logo) {
        //@ts-expect-error
        payload.storeLogo = `${config_1.default.base_url}/uploads/${req.files['logo'][0].filename}`;
    }
    if (req.banner) {
        //@ts-expect-error
        payload.storeBanner = `${config_1.default.base_url}/uploads/${req.files['banner'][0].filename}`;
    }
    const isStoreExistWith = yield store_model_1.Store.findOne({ _id: storeId });
    if (!isStoreExistWith) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Couldn"t find store with id ' + storeId);
    }
    const updatedStore = yield store_model_1.Store.findOneAndUpdate({ _id: storeId }, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedStore) {
        //@ts-expect-error
        const logo = req.logo ? req.files['logo'][0].filename : null;
        //@ts-expect-error
        const banner = req.banner ? req.files['banner'][0].filename : null;
        if (banner) {
            (0, deleteImages_1.deleteImages)([banner], 'uploads');
        }
        if (logo) {
            (0, deleteImages_1.deleteImages)([logo], 'uploads');
        }
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "Couldn't update to store");
    }
    // return updatedStore
    return updatedStore;
});
const getStoreFromDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let userId;
    let role;
    if (req.user) {
        const user = req.user;
        userId = user.userId;
        role = user.role;
    }
    const { storeId } = req.query;
    let data;
    if (role === 'super_admin') {
        data = yield store_model_1.Store.find({});
    }
    else if (role === 'store_admin') {
        data = yield store_model_1.Store.findOne({ storeAdmin: userId });
    }
    else if (storeId) {
        data = yield store_model_1.Store.findById(storeId);
    }
    else {
        data = null;
    }
    return data;
});
exports.storeServices = {
    createStoreIntoDB,
    updateStoreIntoDB,
    getStoreFromDB,
    getSingleStoreFormDB,
};
