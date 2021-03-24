const Regions = require('../models/regions');

exports.getRegions = async (req, res, next) => {
	try {
		const regions = await Regions.fetchAll();
		return res.json({
			result: true,
			regions,
		});
	} catch (error) {
		next(error);
	}
};
