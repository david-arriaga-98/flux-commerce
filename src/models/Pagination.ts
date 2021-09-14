export interface IPage<T> {
	content: T[];
	pageable: IPageable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	sort: ISort;
	first: boolean;
	number: number;
	numberOfElements: number;
	size: number;
	empty: boolean;
}

export interface IPageable {
	sort: ISort;
	pageNumber: number;
	pageSize: number;
	offset: number;
	paged: boolean;
	unpaged: boolean;
}

export interface ISort {
	sorted: boolean;
	unsorted: boolean;
	empty: boolean;
}
