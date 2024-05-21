"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('super_admin'), admin_controller_1.AdminControllers.getAllAdmins);
router.get('/:id', admin_controller_1.AdminControllers.getSingleAdmin);
router.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.updateStoreAdminValidationSchema), admin_controller_1.AdminControllers.updateAdmin);
router.delete('/:id', admin_controller_1.AdminControllers.deleteAdmin);
exports.StoreAdminRoutes = router;
