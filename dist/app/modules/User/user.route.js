"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("../Store_Admin/admin.validation");
const user_controller_1 = require("./user.controller");
const admin_validation_2 = require("../Super_Admin/admin.validation");
const router = express_1.default.Router();
router.post('/create-store-admin', (0, validateRequest_1.default)(admin_validation_1.StoreAdminValidations.storeAdminValidationSchema), user_controller_1.userControllers.createStoreAdmin);
router.post('/create-super-admin', (0, validateRequest_1.default)(admin_validation_2.SuperAdminValidation.SuperAdminValidationSchema), user_controller_1.userControllers.createSuperAdmin);
exports.UserRoutes = router;
