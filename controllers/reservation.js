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

exports.add = async (req, res, next) => {
	try {
		checkValidationError(req);
		const {
			resDate,
			statusCode,
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

		const reservation = await new Reservation(
			resDate,
			statusCode,
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
			companyId
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
			statusCode,
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

		const reservation = await Reservation.update(
			resId,
			resDate,
			statusCode,
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
			companyId
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
