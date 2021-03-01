const Property_Places = require('../models/property_places');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getProperty_Places = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { propertyId } = req.query;
		const property_places = await Property_Places.getProperty_Places(
			propertyId
		);
		return res.json({
			result: true,
			property_places,
		});
	} catch (error) {
		next(error);
	}
};

exports.addUpdatePlaces = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { propertyId, property_places } = req.body;

		// find new added property_places
		const newAdded = property_places.filter((p) => {
			return !p.hasOwnProperty('id');
		});

		// need update property_places
		const needUpdate = property_places.filter((p) => {
			return p.hasOwnProperty('id');
		});

		if (newAdded.length > 0) {
			await Property_Places.addProperty_Places(newAdded);
		}

		if (needUpdate.length > 0) {
			await Property_Places.updateProperty_Places(needUpdate);
		}

		const data = await Property_Places.getProperty_Places(propertyId);

		return res.json({
			result: true,
			updatedProperty_places: data,
		});
	} catch (error) {
		next(error);
	}
};
