const Property_IncludedInPriceFeatures = require('../models/property_includedInPriceFeatures');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getProperty_IncludedInPriceFeatures = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { propertyId } = req.query;
		const property_includedInPriceFeatures = await Property_IncludedInPriceFeatures.getProperty_IncludedInPriceFeatures(
			propertyId
		);
		return res.json({
			result: true,
			property_includedInPriceFeatures,
		});
	} catch (error) {
		next(error);
	}
};

exports.addDeleteFeatures = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { propertyId, property_includedInPriceFeatures } = req.body;

		// find new added features
		const newAddedFeatures = property_includedInPriceFeatures.filter(
			(p) => {
				return !p.hasOwnProperty('id');
			}
		);

		// not deleted features, OR, the records that already exists in the table
		const notDeletedFeatures = property_includedInPriceFeatures.filter(
			(p) => {
				return p.hasOwnProperty('id');
			}
		);

		const notDeletedFeaturesIds = notDeletedFeatures.map((pf) => {
			return pf.id;
		});

		await Property_IncludedInPriceFeatures.deletePFExceptThese(
			notDeletedFeaturesIds,
			propertyId
		);

		// add new added features to the db
		if (newAddedFeatures.length > 0) {
			await Property_IncludedInPriceFeatures.addProperty_IncludedInPriceFeatures(
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
