import { IRoutes, RouteType } from '../models/Route';
import Orders from '../pages/Orders';
import Cart from '../pages/products/Cart';

const userRoutes: IRoutes[] = [
	{
		component: Cart,
		path: '/cart',
		routeType: RouteType.USER_ROUTE
	},
	{
		component: Orders,
		path: '/order',
		routeType: RouteType.USER_ROUTE
	}
];

export default userRoutes;
