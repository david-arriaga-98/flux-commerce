export enum RolesEnum {
	ROLE_ADMIN = 'ROLE_ADMIN',
	ROLE_USER = 'ROLE_USER'
}

// SignIn Request & Responses
export interface ISignInRequest {
	email: string;
	password: string;
}

export interface IUserData {
	firstname: string;
	lastname: string;
	token: string;
	type: string;
	id: number;
	email: string;
	role: RolesEnum;
}

// SignUp Request & Response
export interface ISignUpRequest extends ISignInRequest {
	firstname: string;
	lastname: string;
}
