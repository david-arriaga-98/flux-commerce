import { Dispatch } from 'redux';
import { IAction } from '.';
import { ICartItem, ICartRequest } from '../../models/Cart';
import { IProduct } from '../../models/Product';
import { getShoppingCart, addProductToCart } from '../../services/cartService';
import { errorToLoad, startToLoad, successToLoad } from './app.duck';

export enum CartOptions {
	START_GET_CART = '@@cart/START_GET_CART',
	SUCCESS_GET_CART = '@@cart/SUCCESS_GET_CART',
	ERROR_GET_CART = '@@cart/ERROR_GET_CART',
	TOGGLE_MODAL = '@@cart/TOGGLE_MODAL'
}

interface ICartPayload {
	data?: ICartItem[];
	itemToSave?: IProduct;
	errorMsg?: string;
}

export interface ICartState {
	isLoading: boolean;
	isError: boolean;
	isLoadedData: boolean;
	cart?: ICartItem[];
	errorMsg?: string;
	// Assign
	modal: boolean;
	itemToSave?: IProduct;
}

let initialState: ICartState = {
	isLoading: false,
	isError: false,
	isLoadedData: false,
	cart: undefined,
	modal: false,
	itemToSave: undefined,
	errorMsg: undefined
};

const reducer = (
	state = initialState,
	{ type, payload }: IAction<CartOptions, ICartPayload>
): ICartState => {
	switch (type) {
		case CartOptions.START_GET_CART:
			return {
				...state,
				isError: false,
				isLoading: true,
				isLoadedData: false,
				cart: undefined
			};
		case CartOptions.SUCCESS_GET_CART:
			return {
				...state,
				isError: false,
				isLoading: false,
				isLoadedData: true,
				cart: payload?.data,
				errorMsg: undefined
			};
		case CartOptions.ERROR_GET_CART:
			return {
				...state,
				isError: true,
				isLoading: false,
				isLoadedData: true,
				cart: undefined,
				errorMsg: payload?.errorMsg
			};
		case CartOptions.TOGGLE_MODAL:
			return {
				...state,
				modal: !state.modal,
				itemToSave: payload?.itemToSave,
				errorMsg: undefined
			};
		default:
			return state;
	}
};

export const addArticleToCart = (data: ICartRequest) => {
	return async (dispatch: Dispatch<any>) => {
		try {
			dispatch(startToLoad());
			const response = await addProductToCart(data);
			dispatch(successToLoad(true, response.message));
			dispatch(toggleCreateCartModal());
			dispatch(startGetCart());
		} catch (error) {
			dispatch(
				errorToLoad(
					true,
					'Ha ocurrido un error al tratar de agregar este artículo'
				)
			);
		}
	};
};

export const toggleCreateCartModal = (
	product?: IProduct
): IAction<CartOptions, ICartPayload> => ({
	type: CartOptions.TOGGLE_MODAL,
	payload: {
		itemToSave: product
	}
});

export const startGetCart = () => {
	return async (dispatch: Dispatch<IAction<CartOptions, ICartPayload>>) => {
		try {
			dispatch({ type: CartOptions.START_GET_CART });
			const response = await getShoppingCart();
			dispatch({
				type: CartOptions.SUCCESS_GET_CART,
				payload: {
					data: response
				}
			});
		} catch (error: any) {
			dispatch({
				type: CartOptions.ERROR_GET_CART,
				payload: {
					errorMsg: error.response.data.message
				}
			});
		}
	};
};

export default reducer;
