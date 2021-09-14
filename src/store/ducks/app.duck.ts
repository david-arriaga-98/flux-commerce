import { Dispatch } from 'redux';
import { IAction } from '.';
import { errorNotification, successNotification } from './notification.duck';

export enum AppOptions {
	APP_LOADING = '@@app/APP_LOADING',
	APP_LOADING_SUCCESS = '@@app/APP_LOADING_SUCCESS'
}

export interface IAppState {
	isLoading: boolean;
}

let initialState: IAppState = {
	isLoading: false
};

const reducer = (
	state = initialState,
	{ type }: IAction<AppOptions, undefined>
): IAppState => {
	switch (type) {
		case AppOptions.APP_LOADING:
			return {
				...state,
				isLoading: true
			};
		case AppOptions.APP_LOADING_SUCCESS:
			return {
				...state,
				isLoading: false
			};

		default:
			return state;
	}
};

export const startToLoad = (): IAction<AppOptions, undefined> => {
	return {
		type: AppOptions.APP_LOADING
	};
};

export const successToLoad = (
	showNotification: boolean,
	message: string = 'Todo ha salido bien'
) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: AppOptions.APP_LOADING_SUCCESS });
		if (showNotification) dispatch(successNotification(message));
	};
};

export const errorToLoad = (
	showNotification: boolean,
	message: string = 'Ha ocurrido un error'
) => {
	return (dispatch: Dispatch) => {
		dispatch({ type: AppOptions.APP_LOADING_SUCCESS });
		if (showNotification) dispatch(errorNotification(message));
	};
};

export default reducer;
