import { FC, useState } from 'react';
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
	Label
} from 'reactstrap';
import { ICategoryRequest } from '../../../models/Category';
import { createCategory } from '../../../services/categoryService';
import {
	errorToLoad,
	IAppState,
	startToLoad,
	successToLoad
} from '../../../store/ducks/app.duck';
import { validateImage } from '../../../services/imageService';

type createCategoryProps = {
	modal: boolean;
	toggle: () => void;
	dispatch: Dispatch<any>;
	appState: IAppState;
};

const CreateCategory: FC<createCategoryProps> = ({
	toggle,
	modal,
	dispatch,
	appState
}) => {
	console.log(appState);

	const {
		reset,
		register,
		setError,
		formState: { errors },
		handleSubmit
	} = useForm();

	const [imgName, setImgName] = useState<string>('Escoja un archivo...');

	const onSubmit = async (data: ICategoryRequest) => {
		let imageStatus: boolean = false;
		let image: File = data.image[0];

		try {
			imageStatus = validateImage(image);
		} catch (error: any) {
			setError('image', { message: error.message });
		}

		if (imageStatus) {
			dispatch(startToLoad());

			const formData: FormData = new FormData();
			formData.append('title', data.title);
			formData.append('description', data.description);
			formData.append('image', image);

			try {
				const response = await createCategory(formData);
				reset();
				toggle();
				dispatch(successToLoad(true, response.message));
			} catch (error: any) {
				dispatch(errorToLoad(true, error.message));
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
				<ModalHeader toggle={toggle}>Crear Categoría</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label for="title">Título</Label>
						<input
							disabled={appState.isLoading}
							className="form-control"
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

export default CreateCategory;
