const Provinces = require('../models/provinces');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getProvincesByCountryId = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { countryId } = req.query;
		const provinces = await Provinces.findByCountryId(countryId);
		return res.json({
			result: true,
			provinces,
		});
	} catch (error) {
		next(error);
	}
};
