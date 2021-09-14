import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Row } from 'reactstrap';
import validator from 'validator';
import ErrorPage from '../../components/Error';
import MainLayout from '../../components/layouts/MainLayout';
import Loading from '../../components/loading/Loading';
import { IApplicationState } from '../../store/ducks';
import { IAuthState } from '../../store/ducks/auth.duck';
import { getProducts, IProductState } from '../../store/ducks/product.duck';
import AddToCartModal from './AddToCartModal';
import ProductCard from './ProductCard';

type ShopUrlParams = {
	page?: string;
};

const Shop: FC = () => {
	const dispatch = useDispatch();
	const { page = '1' } = useParams<ShopUrlParams>();
	const [isValidPage, setIsValidPage] = useState<boolean>(false);
	const productState = useSelector<IApplicationState, IProductState>(
		(state) => state.product
	);
	const authState = useSelector<IApplicationState, IAuthState>(
		(state) => state.auth
	);

	useEffect(() => {
		setIsValidPage(validator.isInt(page));
		let currentPage: number = parseInt(page) - 1;
		if (currentPage < 0 || currentPage > 2000) setIsValidPage(false);
		else {
			if (isValidPage) dispatch(getProducts(`?page=${currentPage}&size=20`));
		}
	}, [dispatch, page, isValidPage]);

	return (
		<MainLayout withContainer={true}>
			{isValidPage ? (
				productState.isLoading && !productState.isLoadedData ? (
					<Loading />
				) : (
					<>
						<Row>
							{productState.productPage?.content.map((v, k) => {
								return <ProductCard data={v} key={k} authState={authState} />;
							})}
						</Row>
						<AddToCartModal />
					</>
				)
			) : (
				<ErrorPage message="La url ingresada, es inválida" />
			)}
		</MainLayout>
	);
};

export default Shop;
