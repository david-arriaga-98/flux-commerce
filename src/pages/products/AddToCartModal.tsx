import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Col,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	Modal,
	ModalBody,
	ModalFooter,
	Row
} from 'reactstrap';
import { IMAGE_STORAGE_URL } from '../../constants';
import { ICartRequest } from '../../models/Cart';
import { IApplicationState } from '../../store/ducks';
import {
	addArticleToCart,
	ICartState,
	toggleCreateCartModal
} from '../../store/ducks/cart.duck';
import { errorNotification } from '../../store/ducks/notification.duck';

const AddToCartModal = () => {
	const dispatch = useDispatch();
	const state = useSelector<IApplicationState, ICartState>(
		(state) => state.cart
	);

	const toggle = () => dispatch(toggleCreateCartModal());

	let [total, setTotal] = useState<number>(0);
	let [totalToPay, setTotalToPay] = useState<number>(0);

	const addElement = () => {
		setTotal((total += 1));
		setTotalToPay(
			total * (state.itemToSave?.price ? state.itemToSave?.price : 0)
		);
	};

	const quitElement = () => {
		if (total !== 0) {
			setTotal((total -= 1));
			setTotalToPay(
				total * (state.itemToSave?.price ? state.itemToSave?.price : 0)
			);
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (total === 0)
			dispatch(errorNotification('La cantidad debe ser mayor a cero'));
		else {
			if (state.itemToSave) {
				const dataToSend: ICartRequest = {
					product: state.itemToSave?.id,
					quantity: total
				};
				dispatch(addArticleToCart(dataToSend));
			} else dispatch(errorNotification('Ha ocurrido un error'));
		}
	};

	useEffect(() => {
		if (!state.modal) {
			setTotalToPay(0);
			setTotal(0);
		}
	}, [state.modal]);

	return state.modal ? (
		<Modal size="lg" isOpen={state.modal} toggle={toggle}>
			<Form onSubmit={handleSubmit}>
				<ModalBody>
					<Row>
						<Col md="4">
							<img
								src={IMAGE_STORAGE_URL + state.itemToSave?.image}
								alt={state.itemToSave?.title}
								className="img-fluid"
							/>
						</Col>
						<Col md="8">
							<p className="display-7">{state.itemToSave?.title}</p>
							<p className="text-secondary">{state.itemToSave?.description}</p>

							<p style={{ fontSize: '17px' }}>
								Precio Unitario $ {state.itemToSave?.price}
							</p>
							<p style={{ fontSize: '17px' }} className="text-primary">
								Subtotal $ {totalToPay}
							</p>

							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<Button onClick={addElement} color="primary">
										<i className="fa fa-plus"></i>
									</Button>
								</InputGroupAddon>
								<Input
									disabled={true}
									style={{ fontSize: '14px' }}
									placeholder={total.toString()}
								/>
								<InputGroupAddon addonType="append">
									<Button onClick={quitElement} color="danger">
										<i className="fa fa-window-minimize"></i>
									</Button>
								</InputGroupAddon>
							</InputGroup>
						</Col>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" type="submit">
						<i className="fa fa-plus mr-1"></i> Agregar al carrito
					</Button>
					<Button onClick={toggle} color="danger">
						<i className="fa fa-times mr-1"></i>Salir
					</Button>
				</ModalFooter>
			</Form>
		</Modal>
	) : (
		<></>
	);
};

export default AddToCartModal;
