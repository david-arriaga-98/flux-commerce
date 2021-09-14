// export interface IProductRequest {
// 	title: string;
// 	description: string;
// 	quantity: number;
// 	price: number;
// 	discount: number;
// 	category: number;
// }

// export interface IProductResponse extends IProductRequest {
// 	id: number;
// 	slug: string;
// }

export interface IProduct {
	id: number;
	title: string;
	description: string;
	slug: string;
	image: string;
	price: number;
	discount: number;
}
