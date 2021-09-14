import { ISignInRequest, IUserData, ISignUpRequest } from '../models/Auth';
import { ISuccessResponse } from '../models/Response';
import Axios from '../utils/axios';
import { addHours, getUnixTime } from 'date-fns';

// We use this function for register users
export const signUp = async (
	data: ISignUpRequest
): Promise<ISuccessResponse<undefined>> => {
	try {
		const response = await Axios.post<ISuccessResponse<undefined>>(
			'/auth/signin',
			data
		);
		return response.data;
	} catch (e) {
		throw e;
	}
};

// Login function
export const signIn = async (data: ISignInRequest): Promise<IUserData> => {
	try {
		const response = await Axios.post<ISuccessResponse<IUserData>>(
			'/auth/signin',
			data
		);
		return response.data.data;
	} catch (e) {
		throw e;
	}
};

// Return the actual user logged in
export const whoAmI = async (): Promise<IUserData> => {
	try {
		const token: string | null = getToken();

		if (!token) throw new Error('The token is wrong');

		const response = await Axios.get<ISuccessResponse<IUserData>>(
			'/auth/whoami',
			{
				headers: {
					authorization: token
				}
			}
		);
		return response.data.data;
	} catch (e) {
		throw e;
	}
};

export const getToken = (): string | null => {
	const token: string | null = localStorage.getItem('token');
	const type: string | null = localStorage.getItem('type');
	const expire: string | null = localStorage.getItem('session-expire');

	if (!token || !type || !expire) return null;

	if (type !== 'Bearer') return null;

	if (parseInt(expire) - getUnixTime(new Date()) > 1) return 'Bearer ' + token;

	return null;
};

export const removeSession = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('type');
	localStorage.removeItem('session-expire');
};

export const persistToken = (token: string, type: string) => {
	localStorage.setItem('token', token);
	localStorage.setItem('type', type);
	localStorage.setItem(
		'session-expire',
		getUnixTime(addHours(new Date(), 1)).toString()
	);
};
