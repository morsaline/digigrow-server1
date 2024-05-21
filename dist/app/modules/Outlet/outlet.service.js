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
exports.outletServices = void 0;
const outlet_model_1 = __importDefault(require("./outlet.model"));
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const deleteImages_1 = require("../../utils/deleteImages");
const admin_model_1 = __importDefault(require("../Store_Admin/admin.model"));
/**
 * Create an outlet in the database.
 * @param {Partial<TOulet>} payload - Partial outlet data.
 * @returns {Promise<object>} Created outlet object.
 */
const createOutLetIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const outlet = yield outlet_model_1.default.create(payload);
    return outlet;
});
const getOutletsFromDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let outlets;
    if ((user === null || user === void 0 ? void 0 : user.role) === 'store_admin') {
        const storeAdmin = yield admin_model_1.default.findById(user.userId);
        outlets = yield outlet_model_1.default.find({ store: storeAdmin === null || storeAdmin === void 0 ? void 0 : storeAdmin.store });
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === 'super_admin') {
        outlets = yield outlet_model_1.default.find({});
    }
    return outlets;
});
const getSingleOutLetFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const outlet = yield outlet_model_1.default.findById(id);
    return outlet;
});
/**
 * Create a table in an outlet.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<object>} Updated outlet object.
 */
const createTableInOutlet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-unused-vars
    const { outletId } = req.params;
    const { tableNumber } = req.body;
    const table = {
        tableId: tableNumber,
        qrCode: res.locals.qrCodeFilePath,
    };
    const isTableAlreadyExists = yield outlet_model_1.default.findOne({
        _id: outletId,
        'tables.tableId': tableNumber,
    });
    if (isTableAlreadyExists) {
        // Find the index of the "qr_code/" segment
        const qrCodeUrl = res.locals.qrCodeFilePath;
        const qrCodeIndex = qrCodeUrl.indexOf('qr_code/');
        // Extract the substring after "qr_code/"
        const qrCodeSegment = qrCodeUrl.substring(qrCodeIndex + 8);
        (0, deleteImages_1.deleteImages)([qrCodeSegment], 'qr_code');
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'table already exists with this id');
    }
    const outlet = yield outlet_model_1.default.findByIdAndUpdate(outletId, { $push: { tables: table } }, { new: true });
    if (!outlet) {
        // Find the index of the "qr_code/" segment
        const qrCodeUrl = res.locals.qrCodeFilePath;
        const qrCodeIndex = qrCodeUrl.indexOf('qr_code/');
        // Extract the substring after "qr_code/"
        const qrCodeSegment = qrCodeUrl.substring(qrCodeIndex + 8);
        (0, deleteImages_1.deleteImages)([qrCodeSegment], 'qr_code');
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "Couldn't update, please try again");
    }
    return outlet;
});
/**
 * Delete a table from an outlet.
 * @param {string} outletId - Outlet ID.
 * @param {string} tableId - Table ID.
 * @returns {Promise<object>} Updated outlet object.
 */
const deleteTableFromOutlet = (outletId, tableId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const outlet = yield outlet_model_1.default.findOneAndUpdate({ _id: outletId, 'tables.tableId': tableId }, { $pull: { tables: { tableId } } });
    if (!outlet) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Table not found');
    }
    const qr_code = outlet.tables.find(table => table.tableId === tableId);
    if (qr_code) {
        // Delete associated QR code images
        const qrCodeIndex = (_a = qr_code === null || qr_code === void 0 ? void 0 : qr_code.qrCode) === null || _a === void 0 ? void 0 : _a.indexOf('qr_code/');
        // Extract the substring after "qr_code/"
        const qrCodeSegment = qr_code === null || qr_code === void 0 ? void 0 : qr_code.qrCode.substring(qrCodeIndex + 8);
        (0, deleteImages_1.deleteImages)([qrCodeSegment], 'qr_code');
    }
    return outlet;
});
/**
 * Delete an outlet from the database.
 * @param {string} id - Outlet ID.
 * @returns {Promise<object>} Deleted outlet object.
 */
const deleteOutletFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const outlet = yield outlet_model_1.default.findByIdAndDelete(id);
    if (!outlet) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Outlet not found');
    }
    const qr_codes = [...outlet.tables].map(table => {
        var _a;
        const qrCodeIndex = (_a = table === null || table === void 0 ? void 0 : table.qrCode) === null || _a === void 0 ? void 0 : _a.indexOf('qr_code/');
        // Extract the substring after "qr_code/"
        const qrCodeSegment = table === null || table === void 0 ? void 0 : table.qrCode.substring(qrCodeIndex + 8);
        return qrCodeSegment;
    });
    (0, deleteImages_1.deleteImages)([...qr_codes], 'qr_code');
    return outlet;
});
exports.outletServices = {
    createOutLetIntoDB,
    createTableInOutlet,
    deleteTableFromOutlet,
    deleteOutletFromDB,
    getOutletsFromDB,
    getSingleOutLetFromDB,
};
