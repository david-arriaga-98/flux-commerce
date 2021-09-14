import { push } from 'connected-react-router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import Image from '../assets/images/hero-img.png';

type errorPageProps = {
	title?: string;
	message: string;
	redirectTo?: string;
	buttonTitle?: string;
};

const ErrorPage: FC<errorPageProps> = ({
	message,
	title = 'Upss... Ha ocurrido un error',
	redirectTo = '/',
	buttonTitle = 'Ir a la página de inicio'
}) => {
	const dispatch = useDispatch();

	return (
		<>
			<Row className="justify-content-center">
				<Col lg="12" md="8" sm="12" className="text-center">
					<img src={Image} className="img-fluid" alt="" />
					<h1 className="mt-3">{title}</h1>
					<p className="text-primary">{message}</p>
					<Button onClick={() => dispatch(push(redirectTo))} color="primary">
						{buttonTitle}
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default ErrorPage;
