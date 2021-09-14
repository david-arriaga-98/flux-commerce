import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dispatch } from 'redux';
import {
	Button,
	Modal,
	Form,
	ModalFooter,
	ModalBody,
	ModalHeader,
	FormGroup,
	Label,
	Row,
	Col
} from 'reactstrap';
import {
	errorToLoad,
	IAppState,
	startToLoad,
	successToLoad
} from '../../../store/ducks/app.duck';
import { validateImage } from '../../../services/imageService';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../../store/ducks';
import {
	getCategories,
	ICategoryState
} from '../../../store/ducks/category.duck';
import { createProduct } from '../../../services/productService';

type createProductProps = {
	modal: boolean;
	toggle: () => void;
	dispatch: Dispatch<any>;
	appState: IAppState;
};

const CreateProduct: FC<createProductProps> = ({
	toggle,
	modal,
	dispatch,
	appState
}) => {
	const {
		reset,
		register,
		setError,
		formState: { errors },
		handleSubmit
	} = useForm();

	const [imgName, setImgName] = useState<string>('Escoja un archivo...');

	const categoryState = useSelector<IApplicationState, ICategoryState>(
		(state) => state.category
	);

	useEffect(() => {
		dispatch(getCategories('?size=50'));
	}, [dispatch]);

	const onSubmit = async (data: any) => {
		let imageStatus: boolean = false;
		let image: File = data.image[0];
		try {
			imageStatus = validateImage(image);
		} catch (error: any) {
			setError('image', { message: error.message });
		}

		if (data.category === '-1')
			setError('category', { message: 'La categoría es requerida' });
		else {
			if (imageStatus) {
				dispatch(startToLoad());
				const formData: FormData = new FormData();
				formData.append('title', data.title);
				formData.append('category', data.category);
				formData.append('price', data.price);
				formData.append('quantity', data.quantity);
				formData.append('discount', data.discount);
				formData.append('description', data.description);
				formData.append('image', image);
				try {
					const response = await createProduct(formData);
					setImgName('Escoja un archivo...');
					reset();
					toggle();
					dispatch(successToLoad(true, response.message));
				} catch (error: any) {
					dispatch(errorToLoad(true, error.message));
				}
			}
		}
	};

	const onChangeImage = (e: any) => {
		try {
			const fileList: FileList = e.target.files;
			if (fileList.length > 0) {
				const image: File = fileList[0];
				setImgName(image.name);
				validateImage(image);
			}
		} catch (error: any) {
			setError('image', { message: error.message });
		}
	};

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ModalHeader toggle={toggle}>Crear Producto</ModalHeader>
				<ModalBody>
					<Row>
						<Col>
							<FormGroup>
								<Label for="title">Título</Label>
								<input
									className="form-control"
									disabled={appState.isLoading}
									type="text"
									id="title"
									{...register('title', {
										required: {
											value: true,
											message: 'El título es requerido'
										},
										minLength: {
											value: 3,
											message: 'El título debe tener minimo 3 carácteres'
										},
										maxLength: {
											value: 75,
											message: 'El título debe tener máximo 75 carácteres'
										}
									})}
								/>
								<span className="error-message">
									{errors.title && errors.title.message}
								</span>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="category">Categoría</Label>
								<select
									disabled={appState.isLoading}
									className="form-control"
									id="category"
									{...register('category', {
										required: {
											value: true,
											message: 'La categoría es requerida'
										},
										validate: (value) =>
											value !== '-1' || 'La categoría es requerida'
									})}
								>
									<option value={-1}>- Seleccione una categoría -</option>
									{categoryState.isLoading && !categoryState.isLoadedData ? (
										<option>Cargando...</option>
									) : categoryState.isError ? (
										<option>
											Ha ocurrido un error al obtener las categorías
										</option>
									) : (
										categoryState.categoriePage?.content.map((value, key) => {
											return (
												<option value={value.id} key={value.id}>
													{value.title}
												</option>
											);
										})
									)}
								</select>

								<span className="error-message">
									{errors.category && errors.category.message}
								</span>
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col>
							<FormGroup>
								<Label for="quantity">Cantidad</Label>
								<input
									disabled={appState.isLoading}
									className="form-control"
									id="quantity"
									{...register('quantity', {
										required: {
											value: true,
											message: 'La cantidad es requerida'
										},
										pattern: {
											value: /^\d+$/,
											message: 'El valor ingresado no es un número entero'
										},
										min: {
											value: 0,
											message: 'No se permiten ingresar números negativos'
										},
										max: {
											value: 1000000,
											message:
												'No se permiten ingresar números mayores a un millon'
										}
									})}
								/>
								<span className="error-message">
									{errors.quantity && errors.quantity.message}
								</span>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="price">Precio</Label>
								<input
									disabled={appState.isLoading}
									className="form-control"
									id="price"
									{...register('price', {
										required: {
											value: true,
											message: 'El precio es requerido'
										},
										pattern: {
											// value: /^\d+\.\d{1,2}?$/,
											value: /^(\d+\.?\d{0,2}|\.\d{0,2})?$/,
											message: 'El valor ingresado es inválido'
										},
										min: {
											value: 0,
											message: 'No se permiten ingresar valores negativos'
										},
										max: {
											value: 1000000,
											message:
												'No se permiten ingresar valores mayores a un millon'
										}
									})}
								/>
								<span className="error-message">
									{errors.price && errors.price.message}
								</span>
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col>
							<FormGroup>
								<Label for="image">Imagen</Label>
								<div className="custom-file">
									<input
										disabled={appState.isLoading}
										type="file"
										className="custom-file-input"
										id="image"
										{...register('image', {
											required: {
												value: true,
												message: 'La imagen es requerida'
											}
										})}
										onChangeCapture={onChangeImage}
									/>
									<label className="custom-file-label">{imgName}</label>
								</div>
								{errors.image ? (
									<span className="error-message">{errors.image.message}</span>
								) : (
									<></>
								)}
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="discount">Descuento</Label>
								<input
									disabled={appState.isLoading}
									className="form-control"
									id="discount"
									{...register('discount', {
										required: {
											value: true,
											message: 'El descuento es requerido'
										},
										pattern: {
											// value: /^\d+\.\d{1,2}?$/,
											value: /^(\d+\.?\d{0,2}|\.\d{0,2})?$/,
											message: 'El valor ingresado es inválido'
										},
										min: {
											value: 0,
											message: 'No se permiten ingresar valores negativos'
										},
										max: {
											value: 1000,
											message: 'No se permiten ingresar valores mayores a mil'
										}
									})}
								/>
								<span className="error-message">
									{errors.discount && errors.discount.message}
								</span>
							</FormGroup>
						</Col>
					</Row>

					<FormGroup>
						<Label for="description">Descripción</Label>
						<textarea
							disabled={appState.isLoading}
							rows={4}
							className="form-control"
							id="description"
							{...register('description', {
								required: {
									value: true,
									message: 'La descripción es requerida'
								},
								minLength: {
									value: 3,
									message: 'La descripción debe tener minimo 3 carácteres'
								},
								maxLength: {
									value: 255,
									message: 'La descripción debe tener máximo 255 carácteres'
								}
							})}
						/>
						<span className="error-message">
							{errors.description && errors.description.message}
						</span>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button
						disabled={appState.isLoading}
						color="primary"
						type="submit"
						size="md"
					>
						<i className="fa fa-save mr-1"></i> Guardar
					</Button>
					<Button
						disabled={appState.isLoading}
						onClick={toggle}
						color="danger"
						size="md"
					>
						<i className="fa fa-times mr-1"></i>Salir
					</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
};

export default CreateProduct;
