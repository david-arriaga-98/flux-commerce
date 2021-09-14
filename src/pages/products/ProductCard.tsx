import { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardImg,
	CardSubtitle,
	CardText,
	CardTitle,
	Col
} from 'reactstrap';
import { IMAGE_STORAGE_URL } from '../../constants';
import { RolesEnum } from '../../models/Auth';
import { IProduct } from '../../models/Product';
import { IAuthState } from '../../store/ducks/auth.duck';
import { toggleCreateCartModal } from '../../store/ducks/cart.duck';

type productCardProps = {
	data: IProduct;
	authState: IAuthState;
};

const ProductCard: FC<productCardProps> = ({ data, authState }) => {
	const dispatch = useDispatch();

	const toggle = (data: IProduct) => dispatch(toggleCreateCartModal(data));

	return (
		<Col xl="3" lg="4" md="6">
			<Card className="text-center">
				<CardImg top src={IMAGE_STORAGE_URL + data.image} />
				<CardBody>
					<CardTitle>
						{data.title.length > 40
							? data.title.substr(0, 40) + ' ...'
							: data.title}
					</CardTitle>
					<CardSubtitle>{data.description}</CardSubtitle>
					<CardText className="text-primary display-7">${data.price}</CardText>
					<ButtonGroup>
						{authState.isLoggedIn &&
						authState.userData?.role !== RolesEnum.ROLE_ADMIN ? (
							<Button onClick={() => toggle(data)} outline color="primary">
								<i className="fa fa-plus mr-2"></i>Agregar al carrito
							</Button>
						) : (
							<></>
						)}

						{/* <Button outline color="info">
							<i className="fa fa-eye mr-2"></i>Ver Artículo
						</Button> */}
					</ButtonGroup>
				</CardBody>
			</Card>
		</Col>
	);
};

export default ProductCard;
