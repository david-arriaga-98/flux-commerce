import { FC } from 'react';
import NotFoundImg from '../assets/images/not-found.jpg';
import MainLayout from './layouts/MainLayout';

const NotFoundPage: FC = () => {
	return (
		<MainLayout withContainer={false}>
			<img src={NotFoundImg} className="img-fluid" alt="" />
		</MainLayout>
	);
};

export default NotFoundPage;
