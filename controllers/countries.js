const Countries = require('../models/countries');

exports.getCoutries = async (req, res, next) => {
	try {
		const countries = await Countries.fetchAll();
		return res.json({
			result: true,
			countries,
		});
	} catch (error) {
		next(error);
	}
};
