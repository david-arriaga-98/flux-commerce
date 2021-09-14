import { FC } from 'react';

export enum RouteType {
	FREE_ROUTE,
	USER_ROUTE,
	ADMIN_ROUTE
}

export interface IRoutes {
	path: string;
	component: FC;
	routeType: RouteType;
}
