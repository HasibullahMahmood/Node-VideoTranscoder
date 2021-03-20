const Reservation = require('../models/reservation');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getReservations = async (req, res, next) => {
	try {
		const companyId = req.companyId;
		const reservations = await Reservation.fetchAll(companyId);
		return res.json({
			result: true,
			reservations,
		});
	} catch (error) {
		next(error);
	}
};

exports.getReservationsByResStatus = async (req, res, next) => {
	try {
		checkValidationError(req);
		const companyId = req.companyId;
		const resStatus_id = req.query.resStatus_id;
		const reservations = await Reservation.fetchByResStatus(
			resStatus_id,
			companyId
		);
		return res.json({
			result: true,
			reservations,
		});
	} catch (error) {
		next(error);
	}
};

exports.getReservationsByDate = async (req, res, next) => {
	try {
		checkValidationError(req);
		const companyId = req.companyId;
		const { startDate, endDate } = req.query;

		const reservations = await Reservation.fetchByDate(
			startDate,
			endDate,
			companyId
		);
		return res.json({
			result: true,
			reservations,
		});
	} catch (error) {
		next(error);
	}
};

exports.add = async (req, res, next) => {
	try {
		checkValidationError(req);
		const {
			resDate,
			resStatus_id,
			agency_id,
			property_id,
			resNo,
			checkIn,
			checkOut,
			name,
			surname,
			email,
			phoneNo,
			guestCount,
			note,
			paymentMethod_id,
			priceType,
			totalPrice,
			deposit,
			currency_id,
		} = req.body;
		const companyId = req.companyId;
		const userId = req.userId;

		const reservation = await new Reservation(
			resDate,
			resStatus_id,
			agency_id,
			property_id,
			resNo,
			checkIn,
			checkOut,
			name,
			surname,
			email,
			phoneNo,
			guestCount,
			note,
			paymentMethod_id,
			priceType,
			totalPrice,
			deposit,
			currency_id,
			companyId,
			userId
		).save();

		return res.json({
			result: true,
			reservation,
		});
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	try {
		checkValidationError(req);
		const {
			resId,
			resDate,
			resStatus_id,
			agency_id,
			property_id,
			resNo,
			checkIn,
			checkOut,
			name,
			surname,
			email,
			phoneNo,
			guestCount,
			note,
			paymentMethod_id,
			priceType,
			totalPrice,
			deposit,
			currency_id,
		} = req.body;
		const companyId = req.companyId;
		const userId = req.userId;

		const reservation = await Reservation.update(
			resId,
			resDate,
			resStatus_id,
			agency_id,
			property_id,
			resNo,
			checkIn,
			checkOut,
			name,
			surname,
			email,
			phoneNo,
			guestCount,
			note,
			paymentMethod_id,
			priceType,
			totalPrice,
			deposit,
			currency_id,
			companyId,
			userId
		);
		return res.json({
			result: true,
			reservation,
		});
	} catch (error) {
		next(error);
	}
};

exports.delete = async (req, res, next) => {
	try {
		checkValidationError(req);
		const companyId = req.companyId;
		const resId = req.body.resId;

		await Reservation.delete(resId, companyId);

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
