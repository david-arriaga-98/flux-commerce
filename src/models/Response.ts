interface IGenericResponse {
	status: string;
	code: number;
	message: string;
}

export interface ISuccessResponse<T> extends IGenericResponse {
	data: T;
}

export interface IErrorResponse extends IGenericResponse {}
