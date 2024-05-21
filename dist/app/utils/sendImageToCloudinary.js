"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploader = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
const path = require("path");
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
// uploading iamges to cloudinary
const sendImageToCloudinary = (imageName, path) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, { public_id: imageName.trim() }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
            // delete a file asynchronously
            fs_1.default.unlink(path, err => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('File is deleted.');
                }
            });
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
/**
 * Multer storage configuration for file uploads
 * @constant
 * @type {multer.StorageEngine}
 */
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
/**
 * Multer configuration for handling file uploads
 * @constant
 * @type {multer.Instance}
 */
exports.uploader = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file) {
            return cb(null, true);
        }
        const supportedImage = /\.(png|jpg|jpeg|webp)$/;
        const extension = path.extname(file.originalname);
        if (file.fieldname === 'logo') {
            req.logo = true;
        }
        if (file.fieldname === 'banner') {
            req.banner = true;
        }
        if (supportedImage.test(extension)) {
            cb(null, true);
        }
        else {
            cb(new Error('Must be a png/jpg image'));
        }
    },
    limits: {
        fileSize: 5000000,
    },
});
/**
 * Express middleware for handling file uploads using Multer
 * @type {multer.Instance}
 * @memberOf module:middlewares
 */
exports.upload = (0, multer_1.default)({ storage: storage });
