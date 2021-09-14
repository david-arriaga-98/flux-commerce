import { Dispatch } from 'redux';
import { IAction } from '.';
import { ICategoryWithProducts } from '../../models/Category';
import { IPage } from '../../models/Pagination';
import { getAllCategories } from '../../services/categoryService';

export enum CategoryOptions {
	START_GET_CATEGORY = '@@category/START_GET_CATEGORY',
	SUCCESS_GET_CATEGORY = '@@category/SUCCESS_GET_CATEGORY',
	ERROR_GET_CATEGORY = '@@category/ERROR_GET_CATEGORY'
}

interface ICategoryPayload {
	data?: IPage<ICategoryWithProducts>;
	errorMessage?: string;
}

export interface ICategoryState {
	isLoading: boolean;
	isError: boolean;
	isLoadedData: boolean;
	categoriePage?: IPage<ICategoryWithProducts>;
	errorMessage?: string;
}

let initialState: ICategoryState = {
	categoriePage: undefined,
	isLoading: false,
	isError: false,
	isLoadedData: false
};

const reducer = (
	state = initialState,
	{ type, payload }: IAction<CategoryOptions, ICategoryPayload>
): ICategoryState => {
	switch (type) {
		case CategoryOptions.START_GET_CATEGORY:
			return {
				...state,
				isError: false,
				isLoading: true,
				isLoadedData: false,
				categoriePage: undefined
			};
		case CategoryOptions.SUCCESS_GET_CATEGORY:
			return {
				...state,
				isError: false,
				isLoading: false,
				isLoadedData: true,
				categoriePage: payload?.data
			};
		case CategoryOptions.ERROR_GET_CATEGORY:
			return {
				...state,
				isError: true,
				isLoading: false,
				isLoadedData: true,
				errorMessage: payload?.errorMessage
			};

		default:
			return state;
	}
};

export const saveCategory = () => {
	return async (dispatch: Dispatch) => {
		try {
		} catch (error) {}
	};
};

export const getCategories = (params: string) => {
	return async (
		dispatch: Dispatch<IAction<CategoryOptions, ICategoryPayload>>
	) => {
		try {
			dispatch({ type: CategoryOptions.START_GET_CATEGORY });
			const response = await getAllCategories(params);
			dispatch({
				type: CategoryOptions.SUCCESS_GET_CATEGORY,
				payload: {
					data: response
				}
			});
		} catch (error) {
			dispatch({
				type: CategoryOptions.ERROR_GET_CATEGORY,
				payload: {
					errorMessage:
						'Ha ocurrido un error al tratar de obtener las categorías'
				}
			});
		}
	};
};

export default reducer;
