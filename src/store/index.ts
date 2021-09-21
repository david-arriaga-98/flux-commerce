import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import rootReducer from './ducks';

export const history: History = createBrowserHistory();

const store = () => {
	return {
		...createStore(
			rootReducer(history),
			compose(applyMiddleware(thunk, routerMiddleware(history)))
		)
	};
};

export default store;
