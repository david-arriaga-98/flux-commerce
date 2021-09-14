import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

// Reducers
import AuthReducer, { IAuthState } from './auth.duck';
import NotificationReducer, { INotificationState } from './notification.duck';
import CategoryReducer, { ICategoryState } from './category.duck';
import AppReducer, { IAppState } from './app.duck';
import ProductReducer, { IProductState } from './product.duck';
import CartReducer, { ICartState } from './cart.duck';

export interface IAction<T, K> {
	type: T;
	payload?: K;
}

export interface IApplicationState {
	router: any;
	auth: IAuthState;
	notification: INotificationState;
	category: ICategoryState;
	app: IAppState;
	product: IProductState;
	cart: ICartState;
}

const rootReducer = (history: History) => {
	return combineReducers<IApplicationState>({
		router: connectRouter(history),
		auth: AuthReducer,
		notification: NotificationReducer,
		category: CategoryReducer,
		app: AppReducer,
		product: ProductReducer,
		cart: CartReducer
	});
};

export default rootReducer;
