export enum ImgSize {
	'COMPLETE' = 'w_860,h_860',
	'TUMBNAIL' = 'w_50,h_50'
}

export const SERVER_URL = 'http://localhost:4500/api';
export const IMAGE_STORAGE_URL =
	'https://res.cloudinary.com/dqvyxdjda/image/upload/w_860,h_860/v1631363076/';

export const getImageStoreBySize = (size: ImgSize) => {
	return `https://res.cloudinary.com/dqvyxdjda/image/upload/${size}/v1631363076/`;
};
