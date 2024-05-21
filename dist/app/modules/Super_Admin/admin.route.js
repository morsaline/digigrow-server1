"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get('/', admin_controller_1.SuperAdminController.getAllAdmins);
router.get('/:id', admin_controller_1.SuperAdminController.getSingleAdmin);
router.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.SuperAdminValidation.UpdateSuperAdminSchema), admin_controller_1.SuperAdminController.updateAdmin);
router.delete('/:id', admin_controller_1.SuperAdminController.deleteAdmin);
exports.SuperAdminRoutes = router;
