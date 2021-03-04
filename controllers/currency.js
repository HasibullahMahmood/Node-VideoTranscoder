const Currency = require('../models/currency');

exports.getCurrencies = async (req, res, next) => {
	try {
		const currencies = await Currency.fetchAll();
		return res.json({
			result: true,
			currencies,
		});
	} catch (error) {
		next(error);
	}
};
