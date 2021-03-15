const AgencyPrice = require('../models/agencyPrice');

const { checkValidationError } = require('../util/utilityFunctions');

exports.getAgencyPrices = async (req, res, next) => {
	try {
		const companyId = req.companyId;
		const agencyPrices = await AgencyPrice.fetchAll(companyId);
		return res.json({
			result: true,
			agencyPrices,
		});
	} catch (error) {
		next(error);
	}
};

exports.getAllByConditions = async (req, res, next) => {
	try {
		checkValidationError(req);
		const {
			agency_id,
			property_id,
			currency_id,
			checkIn,
			checkOut,
		} = req.body;
		const agencyPrices = await AgencyPrice.fetchAllByConditiones(
			agency_id,
			property_id,
			currency_id,
			checkIn,
			checkOut
		);
		return res.json({
			result: true,
			agencyPrices,
		});
	} catch (error) {
		next(error);
	}
};

exports.add = async (req, res, next) => {
	try {
		checkValidationError(req);
		const {
			contractName,
			agency_id,
			property_id,
			startingDate,
			endDate,
			price,
			currency_id,
		} = req.body;
		const companyId = req.companyId;

		const agencyPrice = await new AgencyPrice(
			contractName,
			agency_id,
			property_id,
			startingDate,
			endDate,
			price,
			currency_id,
			companyId
		).save();

		return res.json({
			result: true,
			agencyPrice,
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
			contractName,
			agency_id,
			property_id,
			startingDate,
			endDate,
			price,
			currency_id,
		} = req.body;
		const companyId = req.companyId;

		const updatedAgencyPrice = await AgencyPrice.update(
			id,
			contractName,
			agency_id,
			property_id,
			startingDate,
			endDate,
			price,
			currency_id,
			companyId
		);
		return res.json({
			result: true,
			updatedAgencyPrice,
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

		await AgencyPrice.delete(id, companyId);
		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
