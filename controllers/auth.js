const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Company = require('../models/company');

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed.');
		error.data = errors.array();
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

	try {
		const hashedPass = await bcrypt.hash(password, 12);
		const insertedCompany = await new Company(companyName).save();
		const insertedUser = await new User(
			name,
			surname,
			insertedCompany.id,
			phoneNumber,
			email,
			hashedPass
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
	const email = req.body.email;
	const password = req.body.password;
	const expiresIn = 3600; // 3600 seconds = 1 hr
	try {
		const user = await User.findByEmail(email);
		if (!user) {
			const error = new Error(
				'A user with this email could not be found.'
			);
			throw error;
		}

		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error('Wrong password!');
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
