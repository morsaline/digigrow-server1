"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('store_admin'), (0, validateRequest_1.default)(category_validation_1.CategoryValiations.CategoryValidationSchema), category_controller_1.CategoryController.createCategory);
router.get('/', (0, auth_1.default)('store_admin', 'super_admin', 'staff'), category_controller_1.CategoryController.getStoreCategory);
// router.delete('/:id', CategoryController.deleteCategory);
exports.CategoryRoutes = router;
