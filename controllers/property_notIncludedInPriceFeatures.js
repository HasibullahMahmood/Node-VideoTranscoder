const Property_NotIncludedInPriceFeatures = require('../models/property_notIncludedInPriceFeatures');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getProperty_NotIncludedInPriceFeatures = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { propertyId } = req.query;
		const property_notIncludedInPriceFeatures = await Property_NotIncludedInPriceFeatures.getProperty_NotIncludedInPriceFeatures(
			propertyId
		);
		return res.json({
			result: true,
			property_notIncludedInPriceFeatures,
		});
	} catch (error) {
		next(error);
	}
};

exports.addDeleteFeatures = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { propertyId, property_notIncludedInPriceFeatures } = req.body;

		// find new added features
		const newAddedFeatures = property_notIncludedInPriceFeatures.filter(
			(p) => {
				return !p.hasOwnProperty('id');
			}
		);

		// not deleted features, OR, the records that already exists in the table
		const notDeletedFeatures = property_notIncludedInPriceFeatures.filter(
			(p) => {
				return p.hasOwnProperty('id');
			}
		);

		const notDeletedFeaturesIds = notDeletedFeatures.map((pf) => {
			return pf.id;
		});

		await Property_NotIncludedInPriceFeatures.deletePFExceptThese(
			notDeletedFeaturesIds,
			propertyId
		);

		// add new added features to the db
		if (newAddedFeatures.length > 0) {
			await Property_NotIncludedInPriceFeatures.addProperty_NotIncludedInPriceFeatures(
				newAddedFeatures
			);
		}

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
