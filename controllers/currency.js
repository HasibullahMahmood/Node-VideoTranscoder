const Agency = require('../models/agency');

exports.getCurrencies = async (req, res, next) => {
	try {
		const currencies = await Agency.fetchAll();
		return res.json({
			result: true,
			currencies,
		});
	} catch (error) {
		next(error);
	}
};
