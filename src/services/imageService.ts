export const validateImage = (image: File): boolean => {
	const veriFyImage: boolean = /\.(gif|jpe?g|png|webp|bmp)$/i.test(image.name);
	if (!veriFyImage)
		throw new Error(
			'El archivo ingresado, no es una imagen o no es una imagen válida'
		);
	else {
		const imageInKb = image.size / 1000;
		if (imageInKb > 5120)
			throw new Error('La imagen debe tener un máximo de 5 megabytes');
	}
	return true;
};
