const Agency = require('../models/agency');

exports.getAgencies = async (req, res, next) => {
	try {
		const agencies = await Agency.fetchAll();
		return res.json({
			result: true,
			agencies,
		});
	} catch (error) {
		next(error);
	}
};
