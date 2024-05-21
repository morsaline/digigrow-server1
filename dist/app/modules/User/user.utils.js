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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSuperAdminId = exports.findLastSuperAdmin = exports.generateStoreAdminId = exports.findLastStoreAdmin = void 0;
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
// Faculty ID
const findLastStoreAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield user_model_1.User.findOne({
        role: user_constant_1.USER_ROLE.STORE_ADMIN,
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : undefined;
});
exports.findLastStoreAdmin = findLastStoreAdmin;
const generateStoreAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastAdmin = yield (0, exports.findLastStoreAdmin)();
    if (lastAdmin) {
        currentId = lastAdmin.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generateStoreAdminId = generateStoreAdminId;
const findLastSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastSuperAdmin = yield user_model_1.User.findOne({
        role: user_constant_1.USER_ROLE.SUPER_ADMIN,
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastSuperAdmin === null || lastSuperAdmin === void 0 ? void 0 : lastSuperAdmin.id) ? lastSuperAdmin.id.substring(2) : undefined;
});
exports.findLastSuperAdmin = findLastSuperAdmin;
const generateSuperAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastSuperAdmin = yield (0, exports.findLastStoreAdmin)();
    if (lastSuperAdmin) {
        currentId = lastSuperAdmin.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `SA-${incrementId}`;
    return incrementId;
});
exports.generateSuperAdminId = generateSuperAdminId;
