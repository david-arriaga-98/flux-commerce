import { push } from 'connected-react-router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ErrorPage from '../components/Error';
import Loading from '../components/loading/Loading';
import { successNotification } from '../store/ducks/notification.duck';
import Axios from '../utils/axios';

type VerifyUrlParams = {
	token: string;
};

const Verify: FC = () => {
	const { token } = useParams<VerifyUrlParams>();
	const [res, setRes] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const verifyUser = async () => {
			try {
				Axios.post(`/auth/verify/${token}`, undefined);
				dispatch(
					successNotification(
						'Usuario verificado satisfactoriamente, inicia sesión para continuar'
					)
				);
				setRes(true);
				setLoading(false);
				dispatch(push('/signin'));
			} catch (error) {
				setRes(false);
				setLoading(false);
			}
		};
		verifyUser();
	}, [token, dispatch]);

	return !res && loading ? (
		<Loading />
	) : !res && !loading ? (
		<ErrorPage message="El usuario no se pudo verificar" />
	) : (
		<h1>Usuario verificado, redirigiendo...</h1>
	);
};

export default Verify;
