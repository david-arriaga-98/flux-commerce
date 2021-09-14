import { Context, FC, useEffect } from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxContextValue, useDispatch, useSelector } from 'react-redux';
import ReactNotification, { store } from 'react-notifications-component';

import { IAuthState, startWhoAmI } from './store/ducks/auth.duck';
import Routing from './routes/Routing';
import { IApplicationState } from './store/ducks';
import {
	cleanNotification,
	INotificationState
} from './store/ducks/notification.duck';
import { startGetCart } from './store/ducks/cart.duck';

type AppProps = {
	history: History;
	context: Context<ReactReduxContextValue>;
};

const App: FC<AppProps> = ({ context, history }) => {
	const notificationState = useSelector<IApplicationState, INotificationState>(
		(state) => state.notification
	);

	const authState = useSelector<IApplicationState, IAuthState>(
		(state) => state.auth
	);

	const dispatch = useDispatch();

	// Who am i effect, to get the current user

	useEffect(() => {
		dispatch(startWhoAmI());
	}, [dispatch]);

	// User Cart efect
	useEffect(() => {
		if (authState.userData?.role === 'ROLE_USER') dispatch(startGetCart());
	}, [authState.userData?.role, dispatch]);

	// Notification effect

	useEffect(() => {
		if (notificationState.message && notificationState.type) {
			store.addNotification({
				title:
					notificationState.type === 'error'
						? 'Ha ocurrido un error!'
						: 'Todo ha salido bien!',
				message: notificationState.message,
				type: notificationState.type === 'error' ? 'danger' : 'success',
				insert: 'top',
				container: 'top-right',
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				dismiss: {
					duration: 2500,
					showIcon: true
				}
			});
			dispatch(cleanNotification());
		}
	}, [notificationState.message, notificationState.type, dispatch]);

	return (
		<ConnectedRouter history={history} context={context}>
			<ReactNotification />
			<Routing />
		</ConnectedRouter>
	);
};

export default App;
