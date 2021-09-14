import { IRoutes, RouteType } from '../models/Route';
import GetAllCategories from '../pages/categories/GetAllCategories';
import GetProductsByCategorySlug from '../pages/categories/GetProductsByCategorySlug';
import Login from '../pages/Login';
import Shop from '../pages/products/Shop';
import Register from '../pages/Register';
import Verify from '../pages/Verify';

import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';

const indexRoutes: IRoutes[] = [
	{ path: '/', component: Shop, routeType: RouteType.FREE_ROUTE },
	// User Routes
	{
		path: '/signup',
		component: Register,
		routeType: RouteType.FREE_ROUTE
	},
	{
		path: '/signin',
		component: Login,
		routeType: RouteType.FREE_ROUTE
	},
	{
		path: '/user/verify/:token',
		component: Verify,
		routeType: RouteType.FREE_ROUTE
	},

	// Category Routes
	{
		path: '/category',
		component: GetAllCategories,
		routeType: RouteType.FREE_ROUTE
	},
	{
		path: '/category/:slug',
		component: GetProductsByCategorySlug,
		routeType: RouteType.FREE_ROUTE
	},
	{
		path: '/shop/:page',
		component: Shop,
		routeType: RouteType.FREE_ROUTE
	}
];
// eslint-disable-next-line
export default [...indexRoutes, ...adminRoutes, ...userRoutes];
