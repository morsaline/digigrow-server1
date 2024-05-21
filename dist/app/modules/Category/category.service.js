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
exports.categoryServices = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const admin_model_1 = __importDefault(require("../Store_Admin/admin.model"));
const createFoodCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { categories, storeId } = payload;
    // Find the category by storeId
    const existingCategory = yield category_model_1.default.findOne({ storeId });
    // If category doesn't exist for this storeId, create a new one
    let result;
    if (!existingCategory) {
        result = yield category_model_1.default.create(payload);
    }
    else {
        // If category exists, push the new categories to the existing array
        result = yield category_model_1.default.findOneAndUpdate({ storeId }, { $push: { categories: { $each: categories } } }, { new: true });
    }
    return result;
});
const findStoreFoodCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    let categories;
    if (role === 'store_admin') {
        const storeAdmin = yield admin_model_1.default.findById(userId);
        categories = yield category_model_1.default.findOne({ storeId: storeAdmin === null || storeAdmin === void 0 ? void 0 : storeAdmin.store });
    }
    else {
        categories = null;
    }
    return categories;
});
// const deleteCategoryFromDB = async (id: string) => {
//   const deletedCategory = await Category.findOneAndUpdate({});
//   return deletedCategory;
// };
exports.categoryServices = {
    createFoodCategoryIntoDB,
    findStoreFoodCategory,
    // deleteCategoryFromDB,
};
