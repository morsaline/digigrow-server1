"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const food_validation_1 = require("./food.validation");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const food_controller_1 = require("./food.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-food', sendImageToCloudinary_1.uploader.single('image'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(food_validation_1.FoodValidationSchema), food_controller_1.foodControllers.createFood);
router.get('/', (0, auth_1.default)('store_admin', 'super_admin', 'all'), food_controller_1.foodControllers.getStoreFoods);
router.put('/:foodId', sendImageToCloudinary_1.uploader.single('image'), (req, res, next) => {
    req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
    next();
}, (0, validateRequest_1.default)(food_validation_1.FoodValidations.updateFoodValidationSchema), food_controller_1.foodControllers.updateFood);
router.delete('/:foodId', (0, auth_1.default)('store_admin', 'super_admin'), food_controller_1.foodControllers.deleteFood);
router.get('/', (0, auth_1.default)('super_admin'), food_controller_1.foodControllers.getFoods);
exports.FoodRoutes = router;
