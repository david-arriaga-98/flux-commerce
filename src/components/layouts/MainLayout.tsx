import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { RolesEnum } from '../../models/Auth';
import { IApplicationState } from '../../store/ducks';
import { IAuthState } from '../../store/ducks/auth.duck';
import Footer from '../Footer';
import Header from '../Header';

type MainLayoutProps = {
	withContainer: boolean;
	redirectIsHaveSession?: boolean;
};

const MainLayout: FC<MainLayoutProps> = ({
	children,
	withContainer,
	redirectIsHaveSession = false
}) => {
	const state = useSelector<IApplicationState, IAuthState>(
		(state) => state.auth
	);

	return (
		<>
			{state.isLoggedIn && state.userData && redirectIsHaveSession ? (
				state.userData.role === RolesEnum.ROLE_ADMIN ? (
					<Redirect to="/admin" />
				) : (
					<Redirect to="/" />
				)
			) : (
				<div
					id="main-wrapper"
					data-header-position="fixed"
					data-layout="horizontal"
				>
					<div className="page-wrapper d-block">
						<Header />
						{withContainer ? (
							<div className="page-content container-fluid">{children}</div>
						) : (
							<>{children}</>
						)}

						<Footer />
					</div>
				</div>
			)}
		</>
	);
};

export default MainLayout;
