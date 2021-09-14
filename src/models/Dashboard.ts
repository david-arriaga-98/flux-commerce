export interface IAdminDashboardData {
	bestProducts: IBestProduct[];
	bestSellers: IBestSeller[];
	orderGeneralDescription: IOrderGeneralDescription;
	articles: number;
	users: number;
	categories: number;
}

export interface IBestProduct {
	quantity: number;
	total: number;
	title: string;
	id: number;
}

export interface IBestSeller {
	firstname: string;
	lastname: string;
	email: string;
	quantity: number;
	total: number;
	id: number;
}

export interface IOrderGeneralDescription {
	quantity: number;
	total: number;
	imposition: number;
	orders: number;
	disabledOrders: number;
	enabledOrders: number;
}
