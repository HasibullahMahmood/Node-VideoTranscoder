const Property_Regions = require('../models/property_regions');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getProperty_Regions = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { propertyId } = req.query;
		const property_regions = await Property_Regions.getProperty_Regions(
			propertyId
		);
		return res.json({
			result: true,
			property_regions,
		});
	} catch (error) {
		next(error);
	}
};

exports.addDeleteRegions = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { propertyId, property_regions } = req.body;

		// find new added regions
		const newAddedRegions = property_regions.filter((p) => {
			return !p.hasOwnProperty('id');
		});

		// not deleted regions, OR, the records that already exists in the table
		const notDeletedRegions = property_regions.filter((p) => {
			return p.hasOwnProperty('id');
		});

		const notDeletedRegionsIds = notDeletedRegions.map((pr) => {
			return pr.id;
		});

		await Property_Regions.deletePRExceptThese(
			notDeletedRegionsIds,
			propertyId
		);

		// add new added regions to the db
		if (newAddedRegions.length > 0) {
			await Property_Regions.addProperty_Regions(newAddedRegions);
		}

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
