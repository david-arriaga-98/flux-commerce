import { push } from 'connected-react-router';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
	Col,
	Row,
	Card,
	CardBody,
	Nav,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Table
} from 'reactstrap';

import AdminLayout from '../../layouts/AdminLayout';
import CreateCategory from './CreateCategory';
import {
	getCategories,
	ICategoryState
} from '../../../store/ducks/category.duck';
import { IApplicationState } from '../../../store/ducks';
import { IMAGE_STORAGE_URL } from '../../../constants';
import { IAppState } from '../../../store/ducks/app.duck';

const CategoryAdministration = () => {
	// React dispatch & state

	const dispatch = useDispatch();

	const [modal, setModal] = useState<boolean>(false);

	const categoryState = useSelector<IApplicationState, ICategoryState>(
		(state) => state.category
	);

	const appState = useSelector<IApplicationState, IAppState>(
		(state) => state.app
	);

	// Functions

	useEffect(() => {
		dispatch(getCategories('?page=0&size=10'));
	}, [dispatch]);

	const toggleModal = () => {
		if (!appState.isLoading) setModal(!modal);
	};

	return (
		<AdminLayout>
			<div className="page-breadcrumb">
				<Row>
					<Col md="5" className="align-self-center">
						<h4 className="page-title">Administración de Categorías</h4>
						<div className="d-flex align-items-center">
							<Nav aria-label="breadcrumb">
								<Breadcrumb>
									<BreadcrumbItem>
										<span
											onClick={() => {
												if (!appState.isLoading) dispatch(push('/admin'));
											}}
											className="breadcrumb-item-link"
										>
											Inicio
										</span>
									</BreadcrumbItem>

									<BreadcrumbItem active aria-current="page">
										Categoría
									</BreadcrumbItem>
								</Breadcrumb>
							</Nav>
						</div>
					</Col>
				</Row>
			</div>

			<div className="page-content container-fluid">
				<Card>
					<CardBody>
						<Row className="mb-3">
							<Col>
								<Button
									disabled={appState.isLoading}
									onClick={() => toggleModal()}
									color="primary"
								>
									<i className="fa fa-plus mr-2"></i> Crear Categoría
								</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								{categoryState.isLoading && !categoryState.isLoadedData ? (
									<h1>Cargando</h1>
								) : categoryState.isError ? (
									<h1>Error</h1>
								) : (
									<Table className="no-wrap v-middle" responsive>
										<thead>
											<tr className="border-0">
												<th className="border-0">ID</th>
												<th className="border-0">Nombre</th>
												<th className="border-0">Descripción</th>
												<th className="border-0">Miniatura</th>
											</tr>
										</thead>
										<tbody>
											{categoryState.categoriePage?.content.map(
												(value, key) => {
													return (
														<tr key={key}>
															<td>{value.id}</td>
															<td>{value.title}</td>
															<td>{value.description}</td>
															<td>
																<img
																	width="50px"
																	height="50px"
																	src={IMAGE_STORAGE_URL + value.image}
																	alt={value.title}
																/>
															</td>
														</tr>
													);
												}
											)}
										</tbody>
									</Table>
								)}
							</Col>
						</Row>
					</CardBody>
				</Card>
			</div>
			<CreateCategory
				modal={modal}
				toggle={toggleModal}
				dispatch={dispatch}
				appState={appState}
			/>
		</AdminLayout>
	);
};

export default CategoryAdministration;
