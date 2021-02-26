const Districts = require('../models/districts');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getDistrictsByProvinceId = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { provinceId } = req.query;
		const districts = await Districts.findByProvinceId(provinceId);
		return res.json({
			result: true,
			districts,
		});
	} catch (error) {
		next(error);
	}
};
