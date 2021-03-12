const ResStatuses = require('../models/resStatuses');

exports.getAll = async (req, res, next) => {
	try {
		const resStatuses = await ResStatuses.fetchAll();
		return res.json({
			result: true,
			resStatuses,
		});
	} catch (error) {
		next(error);
	}
};
