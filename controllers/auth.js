const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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

	bcrypt
		.hash(password, 12)
		.then((hashedPw) => {
			const user = new User(
				name,
				surname,
				companyName,
				phoneNumber,
				email,
				hashedPw
			);
			return user.save();
		})
		.then(() => {
			res.status(201).json({
				message: 'User created!',
				result: true,
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
			console.log(user);

			if (!user) {
				const error = new Error(
					'A user with this email could not be found.'
				);
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.Password);
		})
		.then((isEqual) => {
			if (!isEqual) {
				const error = new Error('Wrong password!');
				throw error;
			}
			const token = jwt.sign(
				{
					email: loadedUser.Email,
					userId: loadedUser.ID.toString(),
				},
				'somesupersecretsecret',
				{ expiresIn: '1h' }
			);
			res.status(200).json({
				token: token,
				userId: loadedUser.ID.toString(),
			});
		})
		.catch((err) => {
			next(err);
		});
};
