import { IOrder } from '../models/Order';
import { ISuccessResponse } from '../models/Response';
import Axios from '../utils/axios';

export const getAllOrders = async (token: any): Promise<IOrder[]> => {
	try {
		const response = await Axios.get<ISuccessResponse<IOrder[]>>('/order', {
			cancelToken: token
		});
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

export const generateOrderRequest = async (): Promise<IOrder> => {
	try {
		const response = await Axios.post<ISuccessResponse<IOrder>>('/order');
		return response.data.data;
	} catch (error) {
		throw error;
	}
};
