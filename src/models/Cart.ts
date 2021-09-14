import { IProduct } from './Product';

export interface ICartRequest {
	product: number;
	quantity: number;
}

export interface ICartItem {
	id: number;
	product: IProduct;
	total: number;
	quantity: number;
	discount: number;
}
