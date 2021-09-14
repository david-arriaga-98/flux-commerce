import ReactDOM from 'react-dom';
import App from './App';
import { Provider, ReactReduxContext } from 'react-redux';
import applicationStore, { history } from './store';

// Styles
import './assets/scss/style.scss';
import 'react-notifications-component/dist/theme.css';

export const store = applicationStore();

ReactDOM.render(
	<Provider store={store} context={ReactReduxContext}>
		<App history={history} context={ReactReduxContext} />
	</Provider>,
	document.getElementById('root')
);
