import { ICartItem, ICartRequest } from '../models/Cart';
import { ISuccessResponse } from '../models/Response';
import Axios from '../utils/axios';

export const getShoppingCart = async (): Promise<ICartItem[]> => {
	try {
		const response = await Axios.get<ISuccessResponse<ICartItem[]>>('/cart');
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

export const addProductToCart = async (
	data: ICartRequest
): Promise<ISuccessResponse<null>> => {
	try {
		const response = await Axios.post<ISuccessResponse<null>>('/cart', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const quitProduct = async (
	id: number
): Promise<ISuccessResponse<null>> => {
	try {
		const response = await Axios.delete<ISuccessResponse<null>>('/cart/' + id);
		return response.data;
	} catch (error) {
		throw error;
	}
};
