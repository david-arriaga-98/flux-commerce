import { ICartItem } from './Cart';

export interface IOrder {
	id: number;
	quantity: number;
	discount: number;
	imposition: number;
	subtotal: number;
	total: number;
	enabled: boolean;
}
