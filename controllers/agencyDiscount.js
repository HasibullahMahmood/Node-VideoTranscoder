const AgencyDiscount = require('../models/agencyDiscount');

const { checkValidationError } = require('../util/utilityFunctions');

exports.getAgencyDiscounts = async (req, res, next) => {
	try {
		const companyId = req.companyId;
		const agencyDiscounts = await AgencyDiscount.findById(companyId);
		return res.json({
			result: true,
			agencyDiscounts,
		});
	} catch (error) {
		next(error);
	}
};

exports.add = async (req, res, next) => {
	try {
		checkValidationError(req);
		const {
			discountName,
			agency_id,
			property_id,
			startingDate,
			endDate,
			discount,
		} = req.body;
		const companyId = req.companyId;

		const agencyDiscount = await new AgencyDiscount(
			discountName,
			agency_id,
			property_id,
			startingDate,
			endDate,
			discount,
			companyId
		).save();

		return res.json({
			result: true,
			agencyDiscount,
		});
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	try {
		checkValidationError(req);
		const {
			id,
			discountName,
			agency_id,
			property_id,
			startingDate,
			endDate,
			discount,
		} = req.body;
		const companyId = req.companyId;

		const updatedAgencyDiscount = await AgencyDiscount.update(
			id,
			discountName,
			agency_id,
			property_id,
			startingDate,
			endDate,
			discount,
			companyId
		);
		return res.json({
			result: true,
			updatedAgencyDiscount,
		});
	} catch (error) {
		next(error);
	}
};

exports.delete = async (req, res, next) => {
	try {
		checkValidationError(req);
		const companyId = req.companyId;
		const id = req.body.id;

		await AgencyDiscount.delete(id, companyId);
		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
