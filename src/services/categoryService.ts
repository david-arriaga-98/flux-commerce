import { ICategoryWithProducts } from '../models/Category';
import { IPage } from '../models/Pagination';
import { ISuccessResponse } from '../models/Response';
import Axios from '../utils/axios';

// Get all categories
export const getAllCategories = async (
	params: string
	/* cancelToken: any*/
): Promise<IPage<ICategoryWithProducts>> => {
	try {
		const response = await Axios.get<
			ISuccessResponse<IPage<ICategoryWithProducts>>
		>(
			`/category${params}` /*, {
			cancelToken
		}*/
		);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

// Get category by slug with the product pagination
export const getCategoryBySlugWithProducts = async (
	slug: string,
	params: string,
	cancelToken: any
): Promise<ICategoryWithProducts> => {
	try {
		const response = await Axios.get<ISuccessResponse<ICategoryWithProducts>>(
			`/category/${slug}${params}`,
			{
				cancelToken
			}
		);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

// Create category
export const createCategory = async (
	data: FormData
): Promise<ISuccessResponse<undefined>> => {
	try {
		const response = await Axios.post<ISuccessResponse<undefined>>(
			'/category',
			data
		);
		return response.data;
	} catch (e: any) {
		throw new Error(e.response.data.message);
	}
};
