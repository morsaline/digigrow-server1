"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = require("../modules/Store_Admin/admin.route");
const user_route_1 = require("../modules/User/user.route");
const store_route_1 = require("../modules/Store/store.route");
const outlet_route_1 = require("../modules/Outlet/outlet.route");
const food_route_1 = require("../modules/Food/food.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const category_route_1 = require("../modules/Category/category.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/store-admins',
        route: admin_route_1.StoreAdminRoutes,
    },
    {
        path: '/super-admins',
        route: admin_route_1.StoreAdminRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/stores',
        route: store_route_1.StoreRoutes,
    },
    {
        path: '/outlets',
        route: outlet_route_1.OutletRoutes,
    },
    {
        path: '/foods',
        route: food_route_1.FoodRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
];
moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
