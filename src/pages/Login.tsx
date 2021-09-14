import { push } from 'connected-react-router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import MainLayout from '../components/layouts/MainLayout';
import { ISignInRequest } from '../models/Auth';
import { startLogin } from '../store/ducks/auth.duck';
import Image from '../assets/images/cloud.svg';

const Login: FC = () => {
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm();

	const onSubmit = (data: ISignInRequest) => {
		dispatch(startLogin(data));
	};

	return (
		<MainLayout withContainer={true} redirectIsHaveSession={true}>
			<Row className="d-flex align-items-center justify-content-center">
				<Col md="6">
					<img src={Image} className="hide-image img-fluid" alt="" />
				</Col>
				<Col xl="3" md="6">
					<div className="mb-4 text-center">
						<h1>Iniciar Sesión</h1>
					</div>

					<Form onSubmit={handleSubmit(onSubmit)}>
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
									}
								})}
							/>
							<span className="error-message">
								{errors.email && errors.email.message}
							</span>
						</FormGroup>

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
									}
								})}
							/>
							<span className="error-message">
								{errors.password && errors.password.message}
							</span>
						</FormGroup>
						<FormGroup>
							<Button block={true} color="primary" type="submit">
								Iniciar Sesión
							</Button>
						</FormGroup>
					</Form>
					<p className="text-center">
						¿No tienes una cuenta?{' '}
						<span
							onClick={() => dispatch(push('/signup'))}
							className="btn-link-custom"
						>
							Registrarse
						</span>
					</p>
				</Col>
			</Row>
		</MainLayout>
	);
};

export default Login;
