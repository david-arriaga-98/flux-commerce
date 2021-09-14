import { push } from 'connected-react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardSubtitle,
	CardTitle,
	Col,
	Row
} from 'reactstrap';
import ErrorPage from '../../components/Error';
import MainLayout from '../../components/layouts/MainLayout';
import Loading from '../../components/loading/Loading';
import { IMAGE_STORAGE_URL } from '../../constants';
import { IApplicationState } from '../../store/ducks';
import { getCategories, ICategoryState } from '../../store/ducks/category.duck';

const GetAllCategories = () => {
	const dispatch = useDispatch();

	const state = useSelector<IApplicationState, ICategoryState>(
		(state) => state.category
	);

	useEffect(() => {
		dispatch(getCategories('?page=0&size=50'));
	}, [dispatch]);

	const goToCategory = (slug: string) => dispatch(push('/category/' + slug));

	return state.isLoading && !state.isLoadedData ? (
		<Loading />
	) : state.isError ? (
		<ErrorPage message="Ha ocurrido un error al obtener las categorías" />
	) : (
		<MainLayout withContainer={true}>
			<Row>
				{state.categoriePage?.content.map((v, k) => {
					return (
						<Col xs="12" md="3" key={k}>
							<Card>
								<CardImg top src={IMAGE_STORAGE_URL + v.image} />
								<CardBody className="text-center">
									<CardTitle
										onClick={() => goToCategory(v.slug)}
										className="mb-3"
										style={{ cursor: 'pointer' }}
									>
										{v.title}
									</CardTitle>
									<CardSubtitle className="mb-3">{v.description}</CardSubtitle>
									<Button
										onClick={() => goToCategory(v.slug)}
										outline
										color="primary"
									>
										<i className="fa fa-eye mr-2"></i>Ver categoría
									</Button>
								</CardBody>
							</Card>
						</Col>
					);
				})}
			</Row>
		</MainLayout>
	);
};

export default GetAllCategories;
