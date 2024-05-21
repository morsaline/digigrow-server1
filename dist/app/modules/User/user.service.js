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
exports.userServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = require("../../errors/AppError");
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = __importDefault(require("../Store_Admin/admin.model"));
const user_utils_1 = require("./user.utils");
const admin_model_2 = __importDefault(require("../Super_Admin/admin.model"));
const store_model_1 = require("../Store/store.model");
const createStoreAdminIntoDB = (payload, password) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_password;
    //set store admin role
    userData.role = 'store_admin';
    userData.id = yield (0, user_utils_1.generateStoreAdminId)();
    userData.email = payload.email;
    const isStoreHasAdmin = yield store_model_1.Store.findOne({ _id: payload.store });
    if (isStoreHasAdmin === null || isStoreHasAdmin === void 0 ? void 0 : isStoreHasAdmin.storeAdmin) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'This store already has a store admin');
    }
    // find academic department info
    const isAdminExistWithEmail = yield user_model_1.User.findOne({ email: payload.email });
    if (isAdminExistWithEmail === null || isAdminExistWithEmail === void 0 ? void 0 : isAdminExistWithEmail.email) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User already exists with this email adress');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // array
        //create a user
        if (!newUser.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        const isAdminExistsWithEmail = yield admin_model_1.default.findOne({
            email: payload.email,
        });
        if (isAdminExistsWithEmail === null || isAdminExistsWithEmail === void 0 ? void 0 : isAdminExistsWithEmail.email) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Admin already exists with this email adress');
        }
        // set id , _id as user
        payload.userId = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a store admin (transaction-2)
        const newStoreAdmin = yield admin_model_1.default.create([payload], { session });
        if (!newStoreAdmin.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to create Store Admin');
        }
        const isAdminExistsInStore = yield store_model_1.Store.findById(payload.store);
        if (!(isAdminExistsInStore === null || isAdminExistsInStore === void 0 ? void 0 : isAdminExistsInStore.storeAdmin)) {
            const updatedStore = yield store_model_1.Store.findByIdAndUpdate(payload.store, { storeAdmin: newStoreAdmin[0]._id, adminId: newStoreAdmin[0].userId }, { session });
            if (!updatedStore) {
                throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to create Store Admin');
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStoreAdmin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createSuperAdminIntoDB = (payload, password) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    //set store admin role
    userData.role = 'super_admin';
    userData.id = yield (0, user_utils_1.generateSuperAdminId)();
    userData.password = password;
    userData.email = payload.email;
    // find academic department info
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // array
        //create a user
        if (!newUser.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        const isAdminExistsWithEmail = yield admin_model_2.default.findOne({
            email: payload.email,
        });
        if (isAdminExistsWithEmail === null || isAdminExistsWithEmail === void 0 ? void 0 : isAdminExistsWithEmail.email) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Admin already exists with this email adress');
        }
        // set id , _id as user
        payload.userId = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a store admin (transaction-2)
        const newStoreAdmin = yield admin_model_2.default.create([payload], { session });
        if (!newStoreAdmin.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to create Super Admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStoreAdmin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.userServices = {
    createStoreAdminIntoDB,
    createSuperAdminIntoDB,
};
