import { IProduct } from '../models/Product';
import { IPage } from '../models/Pagination';
import { ISuccessResponse } from '../models/Response';

import Axios from '../utils/axios';

// Create Product
export const createProduct = async (
	formData: FormData
): Promise<ISuccessResponse<null>> => {
	try {
		const response = await Axios.post<ISuccessResponse<null>>(
			'/product',
			formData
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Get Products
export const getAllProducts = async (
	params: string
): Promise<IPage<IProduct>> => {
	try {
		const response = await Axios.get<ISuccessResponse<IPage<IProduct>>>(
			`/product${params}`
		);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

// Get By Slug
export const getProductBySlug = async (slug: string): Promise<IProduct> => {
	try {
		const response = await Axios.get<ISuccessResponse<IProduct>>(
			`/product/${slug}`
		);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};
