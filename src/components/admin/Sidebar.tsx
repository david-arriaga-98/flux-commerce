import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import adminRoutes from '../../routes/adminRoutes';
import { FC } from 'react';
import { IApplicationState } from '../../store/ducks';
import { RouterProps } from 'react-router';

const Sidebar: FC = () => {
	const dispatch = useDispatch();

	const expandLogo = () => {
		document.getElementById('logobg')?.classList.toggle('expand-logo');
	};

	const routerState: any = useSelector<IApplicationState, RouterProps>(
		(state) => state.router
	);

	const activeRoute = (routeName: any) => {
		return routerState.location.pathname.indexOf(routeName) > -1
			? 'selected'
			: '';
	};

	return (
		<aside
			className="left-sidebar"
			id="sidebarbg"
			data-sidebarbg="skin6"
			onMouseEnter={expandLogo.bind(null)}
			onMouseLeave={expandLogo.bind(null)}
		>
			<div className="scroll-sidebar">
				<PerfectScrollbar className="sidebar-nav">
					<Nav id="sidebarnav">
						{adminRoutes.map((value, key) => {
							return (
								<li
									key={key}
									className={activeRoute(value.path) + ' active sidebar-item'}
								>
									<span
										onClick={() => {
											dispatch(push(value.path));
										}}
										className="sidebar-link"
									>
										<i className={value.icon} />
										<span className="hide-menu">{value.name}</span>
									</span>
								</li>
							);
						})}
					</Nav>
				</PerfectScrollbar>
			</div>
		</aside>
	);
};
export default Sidebar;
