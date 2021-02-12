const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const User = require('../models/user');
const {
	checkValidationError,
	checkIsSuperUser,
} = require('../util/utilityFunctions');

exports.getData = (req, res, next) => {
	const userId = req.userId;

	User.findById(userId)
		.then((user) => {
			return res.json({
				result: true,
				user,
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.getACompanyUsers = async (req, res, next) => {
	try {
		checkIsSuperUser(req);
		const companyId = req.companyId;
		const users = await User.getUsersBasedOnCompanyId(companyId);
		return res.json({
			result: true,
			users: users,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		checkIsSuperUser(req);
		checkValidationError(req);

		// extracting the data
		let {
			id,
			name,
			surname,
			email,
			password,
			phoneNumber,
			status,
			isSuperUser,
		} = req.body;
		status = parseInt(status);
		isSuperUser = parseInt(isSuperUser);

		let updatedUser = null;
		if (password) {
			const hashedPass = await bcrypt.hash(password, 12);
			updatedUser = await User.updateUserWithPassword(
				id,
				name,
				surname,
				email,
				hashedPass,
				phoneNumber,
				status,
				isSuperUser
			);
		} else {
			updatedUser = await User.updateUserWithoutPassword(
				id,
				name,
				surname,
				email,
				phoneNumber,
				status,
				isSuperUser
			);
		}
		if (updatedUser) {
			return res.json({
				result: true,
				updatedUser,
			});
		} else {
			return res.json({
				result: false,
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.addUser = async (req, res, next) => {
	try {
		checkIsSuperUser(req);
		checkValidationError(req);

		// extracting the data
		let {
			name,
			surname,
			email,
			password,
			phoneNumber,
			status,
			isSuperUser,
		} = req.body;
		status = parseInt(status);
		isSuperUser = parseInt(isSuperUser);

		const hashedPass = await bcrypt.hash(password, 12);
		const user = new User(
			name,
			surname,
			req.companyId,
			phoneNumber,
			email,
			hashedPass,
			status,
			isSuperUser
		);
		const insertedUser = await user.save();
		return res.json({
			result: true,
			data: insertedUser,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		checkIsSuperUser(req);
		checkValidationError(req);

		const userId = req.body.id;
		await User.deleteUser(userId);
		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
