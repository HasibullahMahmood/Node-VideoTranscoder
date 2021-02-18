const Features = require('../models/features');

exports.getFeatures = async (req, res, next) => {
	try {
		const features = await Features.fetchAll();
		return res.json({
			result: true,
			features,
		});
	} catch (error) {
		next(error);
	}
};
