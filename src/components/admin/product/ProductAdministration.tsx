import { push } from 'connected-react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Col,
	Row,
	Card,
	CardBody,
	Nav,
	Breadcrumb,
	BreadcrumbItem,
	Button
} from 'reactstrap';
import { IApplicationState } from '../../../store/ducks';
import { IAppState } from '../../../store/ducks/app.duck';
import AdminLayout from '../../layouts/AdminLayout';
import CreateProduct from './CreateProduct';

const ProductAdministration = () => {
	const dispatch = useDispatch();

	const appState = useSelector<IApplicationState, IAppState>(
		(state) => state.app
	);

	const [modal, setModal] = useState<boolean>(false);

	const toggleModal = () => {
		if (!appState.isLoading) setModal(!modal);
	};

	return (
		<AdminLayout>
			<div className="page-breadcrumb">
				<Row>
					<Col md="5" className="align-self-center">
						<h4 className="page-title">Administración de Productos</h4>
						<div className="d-flex align-items-center">
							<Nav aria-label="breadcrumb">
								<Breadcrumb>
									<BreadcrumbItem>
										<span
											onClick={() => dispatch(push('/admin'))}
											className="breadcrumb-item-link"
										>
											Inicio
										</span>
									</BreadcrumbItem>

									<BreadcrumbItem active aria-current="page">
										Productos
									</BreadcrumbItem>
								</Breadcrumb>
							</Nav>
						</div>
					</Col>
				</Row>
			</div>

			<div className="page-content container-fluid">
				<Card>
					<CardBody className="">
						<Row className="mb-3">
							<Col>
								<Button
									disabled={appState.isLoading}
									onClick={() => toggleModal()}
									color="primary"
								>
									<i className="fa fa-plus mr-2"></i> Crear Producto
								</Button>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</div>
			<CreateProduct
				appState={appState}
				dispatch={dispatch}
				toggle={toggleModal}
				modal={modal}
			/>
		</AdminLayout>
	);
};

export default ProductAdministration;
