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
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
function generateQRCode(url, storeId, outletId, tableNumber, filePath) {
    const fullUrl = `${url}/${storeId}/${outletId}/${tableNumber}`;
    qrcode_1.default.toFile(filePath, fullUrl, function (err) {
        if (err)
            throw err;
        console.log('QR code generated successfully');
    });
}
// Middleware to generate QR code
const qrCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storeId, outletId } = req.params;
        const { tableNumber } = req.body;
        const folderName = 'qr_code'; // Folder name
        const fileName = `${outletId}_${tableNumber}_${Date.now()}_qrcode.png`;
        // eslint-disable-next-line no-undef
        const folderPath = path_1.default.join(
        // eslint-disable-next-line no-undef
        __dirname, '..', '..', '..', folderName); // Get full path to the folder
        // Check if the folder exists, if not, create it
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath);
        }
        // Generate and save the QR code
        const filePath = path_1.default.join(folderPath, fileName);
        generateQRCode(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.client_url, storeId, outletId, tableNumber, filePath);
        // Set the file path to the response locals for further usage
        res.locals.qrCodeFilePath = `${config_1.default.base_url}/qr_code/${fileName}`;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = qrCode;
