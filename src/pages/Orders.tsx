import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Row, Table } from 'reactstrap';
import ErrorPage from '../components/Error';
import MainLayout from '../components/layouts/MainLayout';
import Loading from '../components/loading/Loading';
import { IOrder } from '../models/Order';
import { getAllOrders } from '../services/orderService';

const Order = () => {
	const [loading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<IOrder[] | null>();
	const [error, setError] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);

	useEffect(() => {
		const source = axios.CancelToken.source();

		const getData = async () => {
			try {
				setIsLoading(true);
				const response = await getAllOrders(source.token);
				setData([...response]);
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
	) : (
		<MainLayout withContainer={true}>
			{error ? (
				<ErrorPage message={errorMsg} />
			) : (
				<Row className="justify-content-center">
					<Col md="8">
						<Card>
							<CardTitle
								style={{ fontSize: '16px', fontWeight: 'normal' }}
								className="bg-light border-bottom p-3 mb-0 text-primary"
							>
								<i className="fa fa-shopping-cart mr-2"> </i>
								Ordenes de Compra
							</CardTitle>
							<CardBody>
								<Table className="no-wrap v-middle" responsive>
									<thead>
										<tr className="border-0">
											<th className="border-0">Código</th>
											<th className="border-0">Estado</th>
											<th className="border-0">Unidades</th>
											<th className="border-0">Descuento</th>
											<th className="border-0">Impuesto</th>
											<th className="border-0">Subtotal</th>
											<th className="border-0">Total</th>
										</tr>
									</thead>
									<tbody>
										{data?.map((v, k) => {
											return (
												<tr key={k}>
													<td>{v.id}</td>
													<td>
														<i
															className={
																v.enabled
																	? 'fa fa-circle text-success'
																	: 'fa fa-circle text-danger'
															}
														></i>
													</td>
													<td>{v.quantity}</td>
													<td>$ {v.discount}</td>
													<td>$ {v.imposition}</td>
													<td>$ {v.subtotal}</td>
													<td className="blue-grey-text  text-darken-4 font-medium">
														$ {v.total}
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
		</MainLayout>
	);
};

export default Order;
