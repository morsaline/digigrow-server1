import { Router } from 'express';
import { StoreAdminRoutes } from '../modules/Store_Admin/admin.route';
import { UserRoutes } from '../modules/User/user.route';
import { StoreRoutes } from '../modules/Store/store.route';
import { OutletRoutes } from '../modules/Outlet/outlet.route';
import { FoodRoutes } from '../modules/Food/food.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CategoryRoutes } from '../modules/Category/category.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/store-admins',
    route: StoreAdminRoutes,
  },
  {
    path: '/super-admins',
    route: StoreAdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/stores',
    route: StoreRoutes,
  },
  {
    path: '/outlets',
    route: OutletRoutes,
  },
  {
    path: '/foods',
    route: FoodRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
