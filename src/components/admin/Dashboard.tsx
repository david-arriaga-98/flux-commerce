import {
	Breadcrumb,
	BreadcrumbItem,
	Card,
	CardBody,
	CardSubtitle,
	CardTitle,
	Col,
	Nav,
	Row
} from 'reactstrap';
import AdminLayout from '../layouts/AdminLayout';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { IAdminDashboardData } from '../../models/Dashboard';
import axios from 'axios';
import { getAdminDashboardData } from '../../services/dashboardService';
import Loading from '../loading/Loading';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../Error';

const Dashboard = () => {
	const [loading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<IAdminDashboardData | null>();
	const [error, setError] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);

	const dataxx = {
		labels: data?.bestProducts.reduce(
			(prev, curr) => prev.concat(curr.title),
			Array.of()
		),
		datasets: [
			{
				label: '$ Dolares',
				data: data?.bestProducts.reduce(
					(prev, curr) => prev.concat(curr.total),
					Array.of()
				),
				borderWidth: 1,
				backgroundColor: 'rgba(94,114,228,.1)',
				borderColor: 'rgb(94,114,228)',
				pointBorderColor: 'rgb(94,114,228)',
				pointBackgroundColor: 'rgb(94,114,228)'
			}
		]
	};

	const options = {
		indexAxis: 'y',
		// Elements options apply to all of the options unless overridden in a dataset
		// In this case, we are setting the border of each horizontal bar to be 2px wide
		elements: {
			bar: {
				borderWidth: 2
			}
		},
		responsive: true,
		plugins: {
			legend: {
				position: 'right'
			}
		}
	};

	useEffect(() => {
		const source = axios.CancelToken.source();

		const getData = async () => {
			try {
				setIsLoading(true);
				const response = await getAdminDashboardData(source.token);
				setData(response);
				setDataLoaded(true);
				setIsLoading(false);
			} catch (error: any) {
				setErrorMsg(error.response.data.message);
				setError(true);
				setDataLoaded(true);
				setIsLoading(false);
			}
		};
		getData();

		return () => {
			source.cancel();
			setData(null);
		};
	}, []);

	return loading && !dataLoaded ? (
		<Loading />
	) : error ? (
		<MainLayout withContainer={true}>
			<ErrorPage
				message={errorMsg}
				redirectTo="/login"
				buttonTitle="Ir al Dashboard"
			/>
		</MainLayout>
	) : (
		<AdminLayout>
			<div className="page-breadcrumb">
				<Row>
					<Col md="5" className="align-self-center">
						<h4 className="page-title">Dashboard</h4>
						<div className="d-flex align-items-center">
							<Nav aria-label="breadcrumb">
								<Breadcrumb>
									<BreadcrumbItem active aria-current="page">
										Dashboard
									</BreadcrumbItem>
								</Breadcrumb>
							</Nav>
						</div>
					</Col>
				</Row>
			</div>

			<div className="page-content container-fluid">
				<Row>
					<div className="col-sm-12 col-lg-12 d-flex align-items-stretch">
						<div className="card w-100">
							<div className="card-body border-bottom">
								<h4 className="card-title">Resumen</h4>
								<h5 className="card-subtitle">
									Resumen de ventas y ganancias generales
								</h5>
							</div>
							<div className="card-body">
								<div className="row mt-2">
									<div className="col-sm-12 col-md-4 mb-3 mb-md-0">
										<div className="d-flex align-items-center">
											<div className="mr-2">
												<span className="text-orange display-5">
													<i className="fa fa-user"></i>
												</span>
											</div>
											<div>
												<span className="text-muted">
													Impuestos recolectados
												</span>
												<h3 className="font-medium mb-0">
													${data?.orderGeneralDescription.imposition}
												</h3>
											</div>
										</div>
									</div>
									<div className="col-sm-12 col-md-4 mb-3 mb-md-0">
										<div className="d-flex align-items-center">
											<div className="mr-2">
												<span className="text-primary display-5">
													<i className="fa fa-box"></i>
												</span>
											</div>
											<div>
												<span className="text-muted">Productos vendidos</span>
												<h3 className="font-medium mb-0">
													{data?.orderGeneralDescription.quantity}
												</h3>
											</div>
										</div>
									</div>
									<div className="col-sm-12 col-md-4 mb-3 mb-md-0">
										<div className="d-flex align-items-center">
											<div className="mr-2">
												<span className="display-5">
													<i className="fa fa-hand-holding-usd"></i>
												</span>
											</div>
											<div>
												<span className="text-muted">Total en ventas</span>
												<h3 className="font-medium mb-0">
													${data?.orderGeneralDescription.total}
												</h3>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Row>

				<Row>
					<Col sm="6" lg="12">
						<Card style={{ height: '100vh' }}>
							<CardBody>
								<div className="d-flex align-items-center">
									<div>
										<CardTitle>Sales Summary</CardTitle>
										<CardSubtitle>summary of the month</CardSubtitle>
									</div>
									<div className="ml-auto d-flex align-items-center">
										<ul className="list-inline font-12 dl mr-3 mb-0">
											<li className="border-0 p-0 text-info list-inline-item">
												<i className="fa fa-circle"></i> Iphone
											</li>
											<li className="border-0 p-0 text-primary list-inline-item">
												<i className="fa fa-circle"></i> Ipad
											</li>
										</ul>
									</div>
								</div>
								<Row>
									<Col lg="12">
										<div className="campaign ct-charts">
											<div
												className="chart-wrapper"
												style={{ width: '100%', margin: '0 auto', height: 250 }}
											>
												<Bar data={dataxx} options={options} />
											</div>
										</div>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>

				{/* <Card>
					<CardBody className="">
						<Row className="mb-3">
							<Col>
								<Button>
									<i className="fa fa-plus mr-2"></i> Crear Producto
								</Button>
							</Col>
						</Row>
					</CardBody>
				</Card> */}
			</div>
		</AdminLayout>
	);
};
export default Dashboard;
