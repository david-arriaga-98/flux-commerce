import axios, { AxiosInstance } from 'axios';
import { SERVER_URL } from '../constants';
import { store } from '../';

const Axios: AxiosInstance = axios.create({
	baseURL: SERVER_URL
});

Axios.interceptors.request.use((request) => {
	const state = store.getState();
	if (state.auth.isLoggedIn) {
		request.headers[
			'authorization'
		] = `${state.auth.userData?.type} ${state.auth.userData?.token}`;
	}
	return request;
});

export default Axios;
