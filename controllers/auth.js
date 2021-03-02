const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Company = require('../models/company');
const { capitalizeFirstLetter } = require('../util/utilityFunctions');

exports.signup = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			let message = errors.array()[0].param + ' ' + errors.array()[0].msg;
			message = capitalizeFirstLetter(message);
			const error = new Error(message);
			throw error;
		}

		const {
			name,
			surname,
			companyName,
			phoneNumber,
			email,
			password,
		} = req.body;
		const hashedPass = await bcrypt.hash(password, 12);
		const insertedCompany = await new Company(companyName).save();

		const insertedUser = await new User(
			name,
			surname,
			insertedCompany.id,
			phoneNumber,
			email,
			hashedPass,
			1,
			1
		).save();

		return res.status(201).json({
			message: 'User created!',
			result: true,
			data: insertedUser,
		});
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const expiresIn = 3600; // 3600 seconds = 1 hr
		const user = await User.findByEmail(email);
		if (!user) {
			const error = new Error('The email or the password is incorrect!');
			throw error;
		}

		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error('The email or the password is incorrect!');
			throw error;
		}

		if (user.status == false) {
			const error = new Error('You are blocked!');
			throw error;
		}

		const token = jwt.sign(
			{
				email: user.email,
				userId: user.id.toString(),
			},
			'somesupersecretsecret',
			{ expiresIn: expiresIn }
		);

		return res.status(200).json({
			token: token,
			userId: user.id,
			result: true,
			expiresIn: expiresIn,
		});
	} catch (error) {
		next(error);
	}
};
