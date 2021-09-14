import axios, { CancelTokenSource } from 'axios';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import Axios from '../utils/axios';

type VerifyUrlParams = {
	token: string;
};

const Verify: FC = () => {
	const { token } = useParams<VerifyUrlParams>();

	useEffect(() => {
		const source: CancelTokenSource = axios.CancelToken.source();

		const verifyUser = async () => {
			Axios.post(`/auth/verify/${token}`, undefined, {
				cancelToken: source.token
			});
		};
		verifyUser();

		return () => source.cancel();
	}, [token]);

	return (
		<>
			<h1>Verifing {token}</h1>
		</>
	);
};

export default Verify;
