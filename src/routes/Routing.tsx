import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import NotFoundPage from '../components/404';
import Loading from '../components/loading/Loading';
import { RolesEnum } from '../models/Auth';
import { RouteType } from '../models/Route';
import routes from '.';
import { IApplicationState } from '../store/ducks';
import { IAuthState } from '../store/ducks/auth.duck';

const Routing: FC = () => {
	const state = useSelector<IApplicationState, IAuthState>(
		(state) => state.auth
	);

	return (
		<>
			{state.isLoading ? (
				<Loading />
			) : (
				<Switch>
					{state.isLoggedIn
						? // eslint-disable-next-line
						  routes.map((value, key) => {
								if (state.userData?.role === RolesEnum.ROLE_ADMIN) {
									if (value.routeType === RouteType.ADMIN_ROUTE)
										return (
											<Route
												exact
												path={value.path}
												key={key}
												component={value.component}
											/>
										);
								} else if (state.userData?.role === RolesEnum.ROLE_USER) {
									if (value.routeType === RouteType.USER_ROUTE)
										return (
											<Route
												exact
												path={value.path}
												key={key}
												component={value.component}
											/>
										);
								}

								if (value.routeType === RouteType.FREE_ROUTE)
									return (
										<Route
											exact
											path={value.path}
											key={key}
											component={value.component}
										/>
									);
						  })
						: // eslint-disable-next-line
						  routes.map((value, key) => {
								if (value.routeType === RouteType.FREE_ROUTE)
									return (
										<Route
											exact
											path={value.path}
											key={key}
											component={value.component}
										/>
									);
						  })}

					<Route path="*" component={() => <NotFoundPage />} />
				</Switch>
			)}
		</>
	);
};

export default Routing;
