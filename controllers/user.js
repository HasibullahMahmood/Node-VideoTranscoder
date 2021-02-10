const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const User = require('../models/user');

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
		const currentUserId = req.userId;
		const { companyId } = await User.findById(currentUserId);
		const users = await User.getUsersBasedOnCompanyId(companyId);
		const usersWithoutCurrentUser = users.filter((user) => {
			return user.id != currentUserId;
		});
		return res.json({
			result: true,
			users: usersWithoutCurrentUser,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = new Error('Validation failed.');
			error.data = errors.array();
			throw error;
		}

		const { id, name, surname, email, password, phoneNumber } = req.body;
		let updatedUser = null;
		if (password) {
			const hashedPass = await bcrypt.hash(password, 12);
			updatedUser = await User.updateUserWithPassword(
				id,
				name,
				surname,
				email,
				hashedPass,
				phoneNumber
			);
		} else {
			updatedUser = await User.updateUserWithoutPassword(
				id,
				name,
				surname,
				email,
				phoneNumber
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
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = new Error('Validation failed.');
			error.data = errors.array();
			throw error;
		}

		const { name, surname, email, password, phoneNumber } = req.body;
		const currentUserId = req.userId;
		const currentUser = await User.findById(currentUserId);

		const hashedPass = await bcrypt.hash(password, 12);
		const user = new User(
			name,
			surname,
			currentUser.companyId,
			phoneNumber,
			email,
			hashedPass
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
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = new Error('Validation failed.');
			error.data = errors.array();
			throw error;
		}

		const userId = req.body.id;
		await User.deleteUser(userId);
		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
