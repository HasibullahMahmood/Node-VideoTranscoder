const PropertyPhotos = require('../models/propertyPhotos');
const { checkValidationError } = require('../util/utilityFunctions');
const { clearImage } = require('../util/fileMethods');

exports.getPhotos = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { propertyId } = req.query;
		const photos = await PropertyPhotos.fetchAll(propertyId);
		return res.json({
			result: true,
			photos,
		});
	} catch (error) {
		next(error);
	}
};

exports.addPhoto = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { propertyId } = req.body;
		const photoRef = 'propertyPhotos/' + req.file.filename;
		const photo = await new PropertyPhotos(photoRef, propertyId).save();
		return res.json({
			result: true,
			photo,
		});
	} catch (error) {
		next(error);
	}
};

exports.deletePhoto = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { photoId } = req.body;
		const photoData = await PropertyPhotos.findById(photoId);
		const photoRef = photoData.photoRef;

		const photo = await PropertyPhotos.delete(photoId);
		clearImage(photoRef);

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
