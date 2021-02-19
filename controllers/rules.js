const Rules = require('../models/rules');

exports.getRules = async (req, res, next) => {
	try {
		const rules = await Rules.fetchAll();
		return res.json({
			result: true,
			rules,
		});
	} catch (error) {
		next(error);
	}
};
