import {
	Nav,
	NavItem,
	Navbar,
	NavbarBrand,
	Collapse,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

import Logo from '../assets/images/logo.png';
import LogoText from '../assets/images/logoText.png';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../store/ducks';
import { IAuthState, logOutUser } from '../store/ducks/auth.duck';
import { ICartState } from '../store/ducks/cart.duck';
import { FC } from 'react';
import { Dispatch } from 'redux';
import { RolesEnum } from '../models/Auth';

const Header = () => {
	const dispatch = useDispatch();

	const showMobilemenu = () => {
		document.getElementById('main-wrapper')?.classList.toggle('show-sidebar');
	};

	const state = useSelector<IApplicationState, IAuthState>(
		(state) => state.auth
	);

	return (
		<>
			<header className="topbar navbarbg" data-navbarbg="skin6">
				<Navbar className="top-navbar" dark expand="md">
					<div className="navbar-header" id="logobg" data-logobg="skin6">
						<NavbarBrand href="/">
							<b className="logo-icon">
								<img
									src={Logo}
									width="35px"
									alt="homepage"
									className="dark-logo"
								/>
							</b>
							<span className="logo-text">
								<img
									src={LogoText}
									width="180px"
									alt="homepage"
									className="dark-logo"
								/>
							</span>
						</NavbarBrand>

						<button
							className="btn-link nav-toggler d-block d-md-none"
							onClick={() => showMobilemenu()}
						>
							<i className="ti-menu ti-close" />
						</button>
					</div>

					{state.isLoggedIn && state.userData ? (
						<IsLoggedInHeader state={state} dispatch={dispatch} />
					) : (
						<DontIsLoggedInHeader dispatch={dispatch} />
					)}
				</Navbar>
			</header>
		</>
	);
};

type isLoggedInHeaderProps = {
	state: IAuthState;
	dispatch: Dispatch<any>;
};

const IsLoggedInHeader: FC<isLoggedInHeaderProps> = ({ state, dispatch }) => {
	const logOut = () => {
		dispatch(logOutUser());
	};

	return (
		<Collapse className="navbarbg" navbar data-navbarbg="skin6">
			<Nav className="ml-auto float-right" navbar>
				{state.userData?.role === RolesEnum.ROLE_USER ? (
					<UserHeader dispatch={dispatch} />
				) : (
					<>
						<NavItem
							className="btn-link-custom  mr-4"
							onClick={() => dispatch(push('/'))}
							style={{ paddingTop: '22px' }}
						>
							Inicio
						</NavItem>

						<NavItem
							className="btn-link-custom  mr-2"
							onClick={() => dispatch(push('/admin'))}
							style={{ paddingTop: '22px' }}
						>
							Panel
						</NavItem>
					</>
				)}

				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret className="pro-pic">
						<i className="fa fa-user-circle text-primary"></i>
						<span className="ml-2 text-primary">
							{state.userData?.firstname + ' ' + state.userData?.lastname}
						</span>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem divider />
						<DropdownItem onClick={logOut} style={{ cursor: 'pointer' }}>
							<i className="fa fa-power-off mr-1 ml-1" /> Cerrar sesión
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
		</Collapse>
	);
};

type userHeaderProps = {
	dispatch: Dispatch<any>;
};

const UserHeader: FC<userHeaderProps> = ({ dispatch }) => {
	const state = useSelector<IApplicationState, ICartState>(
		(state) => state.cart
	);

	return (
		<>
			<NavItem
				className="btn-link-custom  mr-4"
				onClick={() => dispatch(push('/'))}
				style={{ paddingTop: '22px' }}
			>
				Inicio
			</NavItem>

			<NavItem
				style={{ paddingTop: '22px' }}
				onClick={() => dispatch(push('/shop/1'))}
				className="btn-link-custom  mr-4"
			>
				Productos
			</NavItem>

			<NavItem
				style={{ paddingTop: '22px' }}
				onClick={() => dispatch(push('/category'))}
				className="btn-link-custom  mr-4"
			>
				Categorías
			</NavItem>

			<NavItem
				style={{ paddingTop: '22px' }}
				onClick={() => dispatch(push('/order'))}
				className="btn-link-custom  mr-4"
			>
				<i className="fa fa-sticky-note mr-2"></i>
				Ordenes de Compra
			</NavItem>

			<NavItem
				style={{ paddingTop: '22px' }}
				onClick={() => dispatch(push('/cart'))}
				className="btn-link-custom  mr-2"
			>
				<i className="fa fa-shopping-cart text-primary mr-2"></i>
				{state.cart?.reduce((pa, a) => a.quantity + pa, 0)}
			</NavItem>
		</>
	);
};

type dontIsLoggedInHeaderProps = {
	dispatch: Dispatch<any>;
};

const DontIsLoggedInHeader: FC<dontIsLoggedInHeaderProps> = ({ dispatch }) => {
	return (
		<Collapse className="navbarbg" navbar data-navbarbg="skin6">
			<Nav className="ml-auto float-right" navbar>
				<NavItem
					onClick={() => dispatch(push('/'))}
					className="btn-link-custom mr-4 pt-2"
				>
					Inicio
				</NavItem>
				<NavItem
					onClick={() => dispatch(push('/shop/1'))}
					className="pt-2 btn-link-custom mr-4"
				>
					Productos
				</NavItem>
				<NavItem
					onClick={() => dispatch(push('/category'))}
					className="btn-link-custom mr-4 pt-2"
				>
					Categorías
				</NavItem>
				<NavItem
					onClick={() => dispatch(push('/signin'))}
					className="btn-link-custom mr-4 pt-2"
				>
					Iniciar Sesión
				</NavItem>
				<NavItem>
					<span
						onClick={() => dispatch(push('/signup'))}
						className="btn btn-primary mr-3"
					>
						Registrarse
					</span>
				</NavItem>
			</Nav>
		</Collapse>
	);
};

export default Header;
