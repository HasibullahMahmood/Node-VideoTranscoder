const IncludedInPriceFeatures = require('../models/includedInPriceFeatures');

exports.getFeatures = async (req, res, next) => {
	try {
		const includedInPriceFeatures = await IncludedInPriceFeatures.fetchAll();
		return res.json({
			result: true,
			includedInPriceFeatures,
		});
	} catch (error) {
		next(error);
	}
};
