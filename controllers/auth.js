const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Company = require('../models/company');

exports.signup = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed.');
		error.data = errors.array();
		throw error;
	}

	const name = req.body.name;
	const surname = req.body.surname;
	const companyName = req.body.companyName;
	const phoneNumber = req.body.phoneNumber;
	const email = req.body.email;
	const password = req.body.password;
	let hashedPass;

	bcrypt
		.hash(password, 12)
		.then((hashedPw) => {
			hashedPass = hashedPw;
			const company = new Company(companyName);
			return company.save();
		})
		.then((insertedCompany) => {
			const user = new User(
				name,
				surname,
				insertedCompany.id,
				phoneNumber,
				email,
				hashedPass
			);
			return user.save();
		})
		.then((insertedUser) => {
			res.status(201).json({
				message: 'User created!',
				result: true,
				data: insertedUser,
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	User.findByEmail(email)
		.then((user) => {
			if (!user) {
				const error = new Error(
					'A user with this email could not be found.'
				);
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then((isEqual) => {
			if (!isEqual) {
				const error = new Error('Wrong password!');
				throw error;
			}
			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser.id.toString(),
				},
				'somesupersecretsecret',
				{ expiresIn: '1h' }
			);
			res.status(200).json({
				token: token,
				userId: loadedUser.id,
				result: true,
			});
		})
		.catch((err) => {
			next(err);
		});
};
