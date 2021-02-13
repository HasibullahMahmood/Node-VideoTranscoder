const PropertyType = require('../models/propertyType');
const {
	checkIsSuperUser,
	checkValidationError,
} = require('../util/utilityFunctions');

exports.getPropertyTypes = async (req, res, next) => {
	try {
		const propertyTypes = await PropertyType.fetchAll();
		return res.json({
			result: true,
			propertyTypes,
		});
	} catch (error) {
		next(error);
	}
};
