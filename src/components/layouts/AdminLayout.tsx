import { FC, useEffect, useState } from 'react';
import Sidebar from '../admin/Sidebar';
import Footer from '../Footer';
import Header from '../Header';

const AdminLayout: FC = ({ children }) => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const updateDimensions = () => {
			let element: any = document.getElementById('main-wrapper');
			setWidth(window.innerWidth);
			if (width < 1170) {
				element.setAttribute('data-sidebartype', 'mini-sidebar');
				element.classList.add('mini-sidebar');
			} else {
				element.setAttribute('data-sidebartype', 'full');
				element.classList.remove('mini-sidebar');
			}
		};
		if (document.readyState === 'complete') {
			updateDimensions();
		}
		window.addEventListener('resize', updateDimensions.bind(this));
		window.addEventListener('load', updateDimensions.bind(this));
		return () => {
			window.removeEventListener('load', updateDimensions.bind(this));
			window.removeEventListener('resize', updateDimensions.bind(this));
		};
	}, [width]);

	return (
		<div
			id="main-wrapper"
			data-theme="light"
			data-layout="vertical"
			data-sidebartype="full"
			data-sidebar-position="fixed"
			data-header-position="fixed"
			data-boxed-layout="full"
		>
			<Header />

			<Sidebar />

			<div className="page-wrapper d-block">
				{children}
				<Footer />
			</div>
		</div>
	);
};

export default AdminLayout;
