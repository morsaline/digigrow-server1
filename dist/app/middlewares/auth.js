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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const cathAsync_1 = __importDefault(require("../utils/cathAsync"));
const AppError_1 = require("../errors/AppError");
const auth = (...requiredRoles) => {
    return (0, cathAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        // checking if the token is missing
        if (!token) {
            if (requiredRoles.includes('all')) {
                return next();
            }
            else {
                throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
            }
        }
        // checking if the given token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
        const { role, email } = decoded;
        // checking if the user is exist
        const user = yield user_model_1.User.findOne({ email: email });
        if (!user) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found !');
        }
        // checking if the user is already deleted
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is deleted !');
        }
        // checking if the user is blocked
        const userStatus = user === null || user === void 0 ? void 0 : user.status;
        if (userStatus === 'blocked') {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
        }
        // if (
        //   user.passwordChangedAt &&
        //   User.isJWTIssuedBeforePasswordChanged(
        //     user.passwordChangedAt,
        //     iat as number,
        //   )
        // ) {
        //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
        // }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        // req.user = decoded as JwtPayload;
        req.user = decoded;
        // req.user = decoded;
        next();
    }));
};
exports.default = auth;
