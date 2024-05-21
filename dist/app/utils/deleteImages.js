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
exports.deleteImages = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteImages = (fileUrls, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    for (const fileUrl of fileUrls) {
        // Extract the filename from the URL
        let filename;
        if (filePath == 'uploads') {
            filename = path_1.default.basename(new URL(fileUrl).pathname);
        }
        else {
            filename = fileUrl;
        }
        // Construct the file path on your server
        const filePathDerectory = path_1.default.join(filePath, filename);
        fs_1.default.unlink(filePathDerectory, err => {
            if (err) {
                console.error(`Error deleting image ${filename}: ${err}`);
            }
            else {
                console.log(`file ${filename} deleted successfully.`);
            }
        });
    }
});
exports.deleteImages = deleteImages;
