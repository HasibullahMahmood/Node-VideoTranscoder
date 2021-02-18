const Property_Features = require('../models/property_features');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getPropertyFeatures = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { propertyId } = req.body;
		const propertyFeatures = await Property_Features.getPropertyFeatures(
			propertyId
		);
		return res.json({
			result: true,
			propertyFeatures,
		});
	} catch (error) {
		next(error);
	}
};

exports.addDeleteFeatures = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { propertyId, propertyFeatures } = req.body;

		// find new added features
		const newAddedFeatures = propertyFeatures.filter((p) => {
			return !p.hasOwnProperty('id');
		});

		// not deleted features, OR, the records that already exists in the table
		const notDeletedFeatures = propertyFeatures.filter((p) => {
			return p.hasOwnProperty('id');
		});

		const notDeletedFeaturesIds = notDeletedFeatures.map((pf) => {
			return pf.id;
		});

		await Property_Features.deletePFExceptThese(
			notDeletedFeaturesIds,
			propertyId
		);

		// add new added features to the db
		await Property_Features.addPropertyFeatures(newAddedFeatures);

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
