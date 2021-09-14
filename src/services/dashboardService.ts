import { IAdminDashboardData } from '../models/Dashboard';
import { ISuccessResponse } from '../models/Response';
import Axios from '../utils/axios';

export const getAdminDashboardData = async (
	token: any
): Promise<IAdminDashboardData> => {
	try {
		const response = await Axios.get<ISuccessResponse<IAdminDashboardData>>(
			'/dashboard/admin',
			{
				cancelToken: token
			}
		);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};
