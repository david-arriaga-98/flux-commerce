import { IPage } from './Pagination';
import { IProduct } from './Product';

export interface ICategoryRequest {
	title: string;
	description: string;
	image: FileList;
}

export interface ICategoryResponse {
	title: string;
	description: string;
	id: string;
	slug: string;
	image: string;
}

export interface ICategoryWithProducts extends ICategoryResponse {
	productPage?: IPage<IProduct>;
}
