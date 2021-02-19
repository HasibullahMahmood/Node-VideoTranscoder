const NotIncludedInPriceFeatures = require('../models/notIncludedInPriceFeatures');

exports.getFeatures = async (req, res, next) => {
	try {
		const notIncludedInPriceFeatures = await NotIncludedInPriceFeatures.fetchAll();
		return res.json({
			result: true,
			notIncludedInPriceFeatures,
		});
	} catch (error) {
		next(error);
	}
};
