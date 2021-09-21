import { push } from 'connected-react-router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import MainLayout from '../components/layouts/MainLayout';
import Axios from '../utils/axios';
import Image from '../assets/images/features-3.png';
import {
	errorNotification,
	successNotification
} from '../store/ducks/notification.duck';

const Register: FC = () => {
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		formState: { errors },
		watch
	} = useForm();

	const onSubmit = async (data: any) => {
		try {
			await Axios.post('/auth/signup', data);
			dispatch(
				successNotification(
					'Usuario creado correctamente, verifique su correo para continuar'
				)
			);
			dispatch(push('/signin'));
		} catch (e) {
			dispatch(errorNotification('El usuario no se guardó'));
		}
	};

	return (
		<>
			<MainLayout withContainer={true} redirectIsHaveSession={true}>
				<Row className="d-flex align-items-center justify-content-center">
					<Col md="5">
						<img
							src={Image}
							className="hide-image img-fluid"
							width="80%"
							alt=""
						/>
					</Col>
					<Col md="6" xl="4">
						<div className="mb-4 text-center">
							<h1>Registro de Usuario</h1>
						</div>

						<Form onSubmit={handleSubmit(onSubmit)}>
							<Row>
								<Col>
									<FormGroup>
										<Label for="firstname">Nombre</Label>
										<input
											className="form-control"
											type="text"
											id="firstname"
											{...register('firstname', {
												required: {
													value: true,
													message: 'El nombre es requerido'
												},
												minLength: {
													value: 3,
													message: 'El nombre debe tener mínimo 3 carácteres'
												},
												maxLength: {
													value: 65,
													message: 'El nombre debe tener máximo 65 carácteres'
												}
											})}
										/>
										<span className="error-message">
											{errors.firstname && errors.firstname.message}
										</span>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label for="lastname">Apellido</Label>
										<input
											className="form-control"
											type="text"
											id="lastname"
											{...register('lastname', {
												required: {
													value: true,
													message: 'El apellido es requerido'
												},
												minLength: {
													value: 3,
													message: 'El apellido debe tener mínimo 3 carácteres'
												},
												maxLength: {
													value: 65,
													message: 'El apellido debe tener máximo 75 carácteres'
												}
											})}
										/>
										<span className="error-message">
											{errors.lastname && errors.lastname.message}
										</span>
									</FormGroup>
								</Col>
							</Row>

							<FormGroup>
								<Label for="email">Correo Electrónico</Label>
								<input
									className="form-control"
									type="text"
									id="email"
									{...register('email', {
										required: {
											value: true,
											message: 'El correo electrónico es requerido'
										},
										pattern: {
											value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
											message: 'El correo electrónico ingresado es inválido'
										},
										maxLength: {
											value: 65,
											message:
												'El correo electrónico debe tener máximo 105 carácteres'
										}
									})}
								/>
								<span className="error-message">
									{errors.email && errors.email.message}
								</span>
							</FormGroup>

							<Row>
								<Col>
									<FormGroup>
										<Label for="password">Contraseña</Label>
										<input
											className="form-control"
											type="password"
											id="password"
											{...register('password', {
												required: {
													value: true,
													message: 'La contraseña es requerida'
												},
												minLength: {
													value: 6,
													message:
														'La contraseña debe tener mínimo 6 carácteres'
												},
												maxLength: {
													value: 40,
													message:
														'La contraseña debe tener máximo 40 carácteres'
												}
											})}
										/>
										<span className="error-message">
											{errors.password && errors.password.message}
										</span>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup>
										<Label for="passwordConfirm">Confirmar Contraseña</Label>
										<input
											className="form-control"
											type="password"
											id="passwordConfirm"
											{...register('passwordConfirm', {
												required: {
													value: true,
													message: 'La contraseña es requerida'
												},
												minLength: {
													value: 6,
													message:
														'La contraseña debe tener mínimo 6 carácteres'
												},
												maxLength: {
													value: 40,
													message:
														'La contraseña debe tener máximo 40 carácteres'
												},
												validate: (value) =>
													value === watch('password') ||
													'Las contraseñas no coinciden'
											})}
										/>
										<span className="error-message">
											{errors.passwordConfirm && errors.passwordConfirm.message}
										</span>
									</FormGroup>
								</Col>
							</Row>

							<FormGroup>
								<Button block={true} color="primary" type="submit">
									Registrarse
								</Button>
							</FormGroup>
						</Form>
						<p className="text-center">
							¿Ya tiene una cuenta?{' '}
							<span
								onClick={() => dispatch(push('/signin'))}
								className="btn-link-custom"
							>
								Iniciar Sesión
							</span>{' '}
						</p>
					</Col>
				</Row>
			</MainLayout>
		</>
	);
};
export default Register;
