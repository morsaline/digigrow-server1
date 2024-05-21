"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const store_validation_1 = require("./store.validation");
const store_controller_1 = require("./store.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-store', (0, validateRequest_1.default)(store_validation_1.StoreValidations.StoreValidationSchema), store_controller_1.StoreControllers.createStore);
router.get('/:id', (0, auth_1.default)('super_admin'), store_controller_1.StoreControllers.getSingleStore);
router.put('/update-store/:id', sendImageToCloudinary_1.uploader.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
]), (req, res, next) => {
    req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
    next();
}, (0, validateRequest_1.default)(store_validation_1.StoreValidations.UpdateStoreValidationSchema), store_controller_1.StoreControllers.updateStore);
router.get('/', (0, auth_1.default)('store_admin', 'super_admin', 'all'), store_controller_1.StoreControllers.getStore);
exports.StoreRoutes = router;
