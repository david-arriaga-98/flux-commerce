import { IRoutes, RouteType } from '../models/Route';
import CategoryAdministration from '../components/admin/category/CategoryAdministration';
import ProductAdministration from '../components/admin/product/ProductAdministration';
import Dashboard from '../components/admin/Dashboard';

interface IAdminRoutes extends IRoutes {
	name: string;
	icon: string;
}

const adminRoutes: IAdminRoutes[] = [
	{
		path: '/admin',
		name: 'Dashboard',
		icon: 'ti-loop',
		component: Dashboard,
		routeType: RouteType.ADMIN_ROUTE
	},
	// {
	// 	path: '/admin/user',
	// 	name: 'Usuario',
	// 	icon: 'mdi mdi-account',
	// 	component: UserAdministration,
	// 	routeType: RouteType.ADMIN_ROUTE
	// },
	{
		path: '/admin/categories',
		name: 'Categorias',
		icon: 'mdi mdi-apps',
		component: CategoryAdministration,
		routeType: RouteType.ADMIN_ROUTE
	},
	{
		path: '/admin/products',
		name: 'Productos',
		icon: 'fas fa-boxes',
		component: ProductAdministration,
		routeType: RouteType.ADMIN_ROUTE
	}
];

export default adminRoutes;
