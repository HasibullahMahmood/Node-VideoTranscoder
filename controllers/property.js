const Property = require('../models/property');
const {
	checkIsSuperUser,
	checkValidationError,
} = require('../util/utilityFunctions');

exports.addProperty = async (req, res, next) => {
	try {
		let {
			name,
			shortName,
			propertyTypeId,
			capacity,
			bedroomNumber,
			bedNumber,
			bathroomNumber,
			hasSwimmingPool,
		} = await req.body;
		hasSwimmingPool = parseInt(hasSwimmingPool);
		const companyId = req.companyId;
		let property = new Property(
			name,
			shortName,
			propertyTypeId,
			capacity,
			bedroomNumber,
			bedNumber,
			bathroomNumber,
			hasSwimmingPool,
			companyId
		);
		propertyId = await property.save();

		return res.json({
			result: true,
			id: propertyId,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateProperty = async (req, res, next) => {
	try {
		checkValidationError(req);
		let {
			id,
			name,
			shortName,
			propertyTypeId,
			capacity,
			bedroomNumber,
			bedNumber,
			bathroomNumber,
			hasSwimmingPool,
		} = req.body;

		const companyId = req.companyId;
		hasSwimmingPool = parseInt(hasSwimmingPool);
		const updatedProperty = await Property.update(
			id,
			name,
			shortName,
			propertyTypeId,
			capacity,
			bedroomNumber,
			bedNumber,
			bathroomNumber,
			hasSwimmingPool,
			companyId
		);

		return res.json({
			result: true,
			updatedProperty,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteProperty = async (req, res, next) => {
	try {
		checkValidationError(req);
		const companyId = req.companyId;
		const propertyId = req.body.id;

		await Property.deleteProperty(propertyId, companyId);
		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};

exports.getProperties = async (req, res, next) => {
	try {
		const companyId = req.companyId;
		const properties = await Property.fetchAll(companyId);
		return res.json({
			result: true,
			properties,
		});
	} catch (error) {
		next(error);
	}
};
