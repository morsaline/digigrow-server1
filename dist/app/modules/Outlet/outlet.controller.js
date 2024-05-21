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
exports.outletControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cathAsync_1 = __importDefault(require("../../utils/cathAsync"));
const outlet_service_1 = require("./outlet.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
/**
 * Create an outlet.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const createOutlet = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield outlet_service_1.outletServices.createOutLetIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Outlet created succesfully',
        data: result,
    });
}));
/**
 * Create a table.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const createTable = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield outlet_service_1.outletServices.createTableInOutlet(req, res);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Table added succesfully',
        data: result,
    });
}));
/**
 * Delete a table.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteTable = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { outletId, tableId } = req.params;
    const result = yield outlet_service_1.outletServices.deleteTableFromOutlet(outletId, tableId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Table deleted succesfully',
        data: result,
    });
}));
/**
 * Delete an outlet.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteOutlet = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { outletId } = req.params;
    const result = yield outlet_service_1.outletServices.deleteOutletFromDB(outletId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Outlet deleted succesfully',
        data: result,
    });
}));
const getOutlets = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield outlet_service_1.outletServices.getOutletsFromDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Outlet retrived succesfully',
        data: result,
    });
}));
const getSingleOutlet = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield outlet_service_1.outletServices.getSingleOutLetFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Outlet retrived succesfully',
        data: result,
    });
}));
exports.outletControllers = {
    createOutlet,
    createTable,
    deleteTable,
    deleteOutlet,
    getOutlets,
    getSingleOutlet,
};
