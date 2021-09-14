import { push } from 'connected-react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardTitle,
	Col,
	Row
} from 'reactstrap';
import ErrorPage from '../../components/Error';
import MainLayout from '../../components/layouts/MainLayout';
import Loading from '../../components/loading/Loading';
import { IMAGE_STORAGE_URL } from '../../constants';
import { generateOrderRequest } from '../../services/orderService';
import { IApplicationState } from '../../store/ducks';
import {
	IAppState,
	startToLoad,
	successToLoad,
	errorToLoad
} from '../../store/ducks/app.duck';
import { ICartState, startGetCart } from '../../store/ducks/cart.duck';

const Cart = () => {
	const dispatch = useDispatch();

	const state = useSelector<IApplicationState, ICartState>(
		(state) => state.cart
	);

	const appState = useSelector<IApplicationState, IAppState>(
		(state) => state.app
	);

	const [discount, setDiscount] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);
	const [products, setProducts] = useState<number>(0);
	const [imp, setImp] = useState<number>(0);

	useEffect(() => {
		if (
			!state.isLoading &&
			state.isLoadedData &&
			!state.isError &&
			state.cart
		) {
			setProducts(state.cart.reduce((pv, av) => pv + av.quantity, 0));
			setTotal(state.cart.reduce((pv, av) => pv + av.total, 0));
			setDiscount(state.cart.reduce((pv, av) => pv + av.discount, 0));

			setImp(total * 0.12);
		}
	}, [state, total]);

	const generateOrder = async () => {
		try {
			dispatch(startToLoad());
			await generateOrderRequest();
			dispatch(successToLoad(true, 'La orden fué generada satisfactoriamente'));
			dispatch(startGetCart());
			dispatch(push('/order'));
		} catch (error: any) {
			dispatch(errorToLoad(true, error.response.data.message));
		}
	};

	return state.isLoading && !state.isLoadedData ? (
		<Loading />
	) : (
		<MainLayout withContainer={true}>
			{state.isError ? (
				<ErrorPage
					title="No se pudo obtener sus artículos"
					buttonTitle="Empezar a comprar"
					redirectTo="/shop/1"
					message={state.errorMsg ? state.errorMsg : ''}
				/>
			) : (
				<Row className="justify-content-center">
					<Col md="7" lg="5">
						<Card>
							<CardTitle
								style={{ fontSize: '16px', fontWeight: 'normal' }}
								className="bg-light border-bottom p-3 mb-0 text-primary"
							>
								<i className="fa fa-shopping-cart mr-2"> </i>
								Detalle del carrito de compras
							</CardTitle>
							<CardBody>
								<Row>
									{state.cart?.map((v, k) => {
										return (
											<Col md="12" key={k} className="mt-3">
												<Row>
													<Col md="4">
														<img
															alt=""
															width="200px"
															src={IMAGE_STORAGE_URL + v.product.image}
														/>
													</Col>
													<Col md="8">
														<h2 className="text-primary">{v.product.title}</h2>
														<p className="text-secondary">
															{v.product.description}
														</p>
														<p
															style={{ fontSize: '15px' }}
															className="text-primary"
														>
															Precio unitario $ {v.product.price}
														</p>
														<p
															style={{ fontSize: '15px' }}
															className="text-secondary"
														>
															Cantidad {v.quantity}
														</p>
														<p
															style={{ fontSize: '15px' }}
															className="text-success"
														>
															Subtotal a pagar $ {v.total}
														</p>
													</Col>
												</Row>
											</Col>
										);
									})}
								</Row>
							</CardBody>
						</Card>
					</Col>

					<Col md="5" lg="4">
						<Card>
							<CardTitle
								style={{ fontSize: '16px', fontWeight: 'normal' }}
								className="bg-light border-bottom p-3 mb-0 text-primary"
							>
								Generar orden de compra
							</CardTitle>
							<CardBody>
								<Row>
									<Col md="12">
										<p className="text-secondary" style={{ fontSize: '15px' }}>
											Artículos agregados en carrito{' '}
											<span className="text-primary">{products}</span>
										</p>
										<p className="text-secondary" style={{ fontSize: '15px' }}>
											Subtotal <span className="text-primary">$ {total}</span>
										</p>
										<p className="text-secondary" style={{ fontSize: '15px' }}>
											Descuento{' '}
											<span className="text-primary">$ {discount}</span>
										</p>
										<p className="text-secondary" style={{ fontSize: '15px' }}>
											Impuesto del 12%{' '}
											<span className="text-primary">$ {imp}</span>
										</p>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<Row className="justify-content-between">
									<Col md="7">
										<p className="text-secondary" style={{ fontSize: '15px' }}>
											Total a pagar{' '}
											<span className="text-primary">
												$ {total - discount + imp}
											</span>
										</p>
									</Col>
									<Col md="5">
										<Button
											disabled={appState.isLoading}
											color="primary"
											onClick={generateOrder}
										>
											<i className="fa fa-check mr-1"></i>
											Generar Orden
										</Button>
									</Col>
								</Row>
							</CardFooter>
						</Card>
					</Col>
				</Row>
			)}
		</MainLayout>
	);
};

export default Cart;
