import axios from 'axios';
import { push } from 'connected-react-router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Breadcrumb, BreadcrumbItem, Row } from 'reactstrap';
import ErrorPage from '../../components/Error';
import MainLayout from '../../components/layouts/MainLayout';
import Loading from '../../components/loading/Loading';
import { ICategoryWithProducts } from '../../models/Category';
import { getCategoryBySlugWithProducts } from '../../services/categoryService';
import { IApplicationState } from '../../store/ducks';
import { IAuthState } from '../../store/ducks/auth.duck';
import AddToCartModal from '../products/AddToCartModal';
import ProductCard from '../products/ProductCard';

type GetCategoryParams = {
	slug: string;
};

const GetProductsByCategorySlug: FC = () => {
	const { slug } = useParams<GetCategoryParams>();
	const dispatch = useDispatch();
	const [data, setData] = useState<ICategoryWithProducts | null>();
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const authState = useSelector<IApplicationState, IAuthState>(
		(state) => state.auth
	);

	useEffect(() => {
		const source = axios.CancelToken.source();

		const getData = async () => {
			try {
				const response = await getCategoryBySlugWithProducts(
					slug,
					'?page=0&size=10',
					source.token
				);
				setData({
					...response
				});
				setDataLoaded(true);
			} catch (error) {
				setError(true);
				setDataLoaded(true);
			}
		};
		getData();

		return () => {
			source.cancel();
			setData(null);
		};
	}, [slug]);

	return !dataLoaded ? (
		<Loading />
	) : error ? (
		<MainLayout withContainer={true}>
			<ErrorPage message="La categoría que tratas de buscar, no existe" />
		</MainLayout>
	) : (
		<MainLayout withContainer={false}>
			{!dataLoaded ? (
				<Loading />
			) : error ? (
				<ErrorPage message="Ha ocurrido un error al obtener esta categoría" />
			) : (
				<>
					<div className="hero-section">
						<span className="hero-title">Categoría</span>
						<h1 className="hero-header">{data?.title}</h1>
						<p className="hero-description">{data?.description}</p>
						<Breadcrumb>
							<BreadcrumbItem>
								<span
									onClick={() => dispatch(push('/'))}
									style={{ color: '#ffffff' }}
									className="breadcrumb-item-link"
								>
									Inicio
								</span>
							</BreadcrumbItem>

							<BreadcrumbItem>
								<span
									onClick={() => dispatch(push('/category'))}
									style={{ color: '#ffffff' }}
									className="breadcrumb-item-link"
								>
									Categorías
								</span>
							</BreadcrumbItem>

							<BreadcrumbItem active aria-current="page">
								{data?.title}
							</BreadcrumbItem>
						</Breadcrumb>
					</div>
					<div className="page-content container-fluid">
						{data?.productPage?.content.length === 0 ? (
							<Row className="justify-content-center">
								<p className="display-6 text-center text-primary mt-4">
									No hay artículos que mostrar...
								</p>
							</Row>
						) : (
							<Row>
								{data?.productPage?.content.map((v, k) => (
									<ProductCard key={k} data={v} authState={authState} />
								))}
							</Row>
						)}
					</div>
					<AddToCartModal />
				</>
			)}
		</MainLayout>
	);
};

export default GetProductsByCategorySlug;
