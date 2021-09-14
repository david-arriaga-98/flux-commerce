import { Dispatch } from 'redux';
import { IAction } from '.';
import { IPage } from '../../models/Pagination';
import { IProduct } from '../../models/Product';
import { getAllProducts } from '../../services/productService';

export enum ProductOptions {
	START_GET_PRODUCT = '@@product/START_GET_PRODUCT',
	SUCCESS_GET_PRODUCT = '@@product/SUCCESS_GET_PRODUCT',
	ERROR_GET_PRODUCT = '@@product/ERROR_GET_PRODUCT'
}

interface IProductPayload {
	data?: IPage<IProduct>;
}

export interface IProductState {
	isLoading: boolean;
	isError: boolean;
	isLoadedData: boolean;
	productPage?: IPage<IProduct>;
}

let initialState: IProductState = {
	productPage: undefined,
	isLoading: false,
	isError: false,
	isLoadedData: false
};

const reducer = (
	state = initialState,
	{ type, payload }: IAction<ProductOptions, IProductPayload>
): IProductState => {
	switch (type) {
		case ProductOptions.START_GET_PRODUCT:
			return {
				...state,
				isError: false,
				isLoading: true,
				isLoadedData: false,
				productPage: undefined
			};
		case ProductOptions.SUCCESS_GET_PRODUCT:
			return {
				...state,
				isError: false,
				isLoading: false,
				isLoadedData: true,
				productPage: payload?.data
			};
		case ProductOptions.ERROR_GET_PRODUCT:
			return {
				...state,
				isError: true,
				isLoading: false,
				isLoadedData: true,
				productPage: undefined
			};

		default:
			return state;
	}
};

export const getProducts = (params: string) => {
	return async (
		dispatch: Dispatch<IAction<ProductOptions, IProductPayload>>
	) => {
		try {
			dispatch({ type: ProductOptions.START_GET_PRODUCT });
			const data = await getAllProducts(params);
			dispatch({
				type: ProductOptions.SUCCESS_GET_PRODUCT,
				payload: {
					data
				}
			});
		} catch (error) {
			dispatch({
				type: ProductOptions.ERROR_GET_PRODUCT
			});
		}
	};
};

export default reducer;
