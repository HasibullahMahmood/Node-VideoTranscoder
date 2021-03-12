const ResDays = require('../models/resDays');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getResDays = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { resId } = req.query;
		const resDays = await ResDays.fetchByConditions(resId);
		return res.json({
			result: true,
			resDays,
		});
	} catch (error) {
		next(error);
	}
};

exports.addResDays = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { resDays, resId } = req.body;

		if (resId) {
			await ResDays.delete(resId);
		}

		await ResDays.add(resDays);
		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteResDays = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { resId } = req.body;

		if (resId) {
			await ResDays.delete(resId);
		}
		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
