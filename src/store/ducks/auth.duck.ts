import { push } from 'connected-react-router';
import { IAction } from '.';
import { ISignInRequest, IUserData, RolesEnum } from '../../models/Auth';
import {
	persistToken,
	removeSession,
	signIn,
	whoAmI
} from '../../services/authService';

export enum AuthOptions {
	START_LOGIN = '@@auth/START_LOGIN',
	SUCCESS_LOGIN = '@@auth/SUCCESS_LOGIN',
	ERROR_LOGIN = '@@auth/ERROR_LOGIN',
	LOG_OUT = '@@auth/LOG_OUT'
}

export interface IAuthState {
	isLoggedIn: boolean;
	isLoading: boolean;
	isError: boolean;
	userData?: IUserData;
}

interface IAuthPayload {
	userData?: IUserData;
}

let initialState: IAuthState = {
	isLoggedIn: false,
	isLoading: false,
	isError: false,
	userData: undefined
};

const reducer = (
	state = initialState,
	{ type, payload }: IAction<AuthOptions, IAuthPayload>
): IAuthState => {
	switch (type) {
		case AuthOptions.START_LOGIN:
			return {
				...state,
				isError: false,
				isLoading: true,
				isLoggedIn: false
			};
		case AuthOptions.SUCCESS_LOGIN:
			return {
				...state,
				isError: false,
				isLoading: false,
				isLoggedIn: true,
				userData: payload?.userData
			};

		case AuthOptions.ERROR_LOGIN:
			return {
				...state,
				isError: true,
				isLoading: false,
				isLoggedIn: false,
				userData: undefined
			};
		case AuthOptions.LOG_OUT:
			return {
				...state,
				isError: false,
				isLoading: false,
				isLoggedIn: false,
				userData: undefined
			};

		default:
			return state;
	}
};

// Action creators

export const startWhoAmI = () => {
	return async (dispatch: any) => {
		try {
			dispatch({ type: AuthOptions.START_LOGIN });
			const data: IUserData = await whoAmI();
			dispatch({
				type: AuthOptions.SUCCESS_LOGIN,
				payload: { userData: data }
			});
		} catch (error) {
			dispatch({ type: AuthOptions.ERROR_LOGIN });
		}
	};
};

export const startLogin = (payload: ISignInRequest) => {
	return async (dispatch: any) => {
		try {
			dispatch({ type: AuthOptions.START_LOGIN });
			const data: IUserData = await signIn(payload);
			persistToken(data.token, data.type);
			dispatch({
				type: AuthOptions.SUCCESS_LOGIN,
				payload: { userData: data }
			});
			if (data.role === RolesEnum.ROLE_ADMIN) dispatch(push('/admin'));
			else dispatch(push('/'));
		} catch (e: any) {
			dispatch({ type: AuthOptions.ERROR_LOGIN });
		}
	};
};

export const logOutUser = () => {
	return (dispatch: any) => {
		removeSession();
		dispatch({ type: AuthOptions.LOG_OUT });
		dispatch(push('/signin'));
	};
};

export default reducer;
