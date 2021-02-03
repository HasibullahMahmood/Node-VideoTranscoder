const { validationResult } = require('express-validator/check');

const Company = require('../models/company');
const User = require('../models/user');

exports.getData = (req, res, next) => {
	const userId = req.userId;
	User.findById(userId)
		.then((user) => {
			const companyId = user.companyId;
			return Company.findById(companyId);
		})
		.then((company) => {
			return res.json({
				result: true,
				company,
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.update = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed.');
		error.data = errors.array();
		throw error;
	}

	const userId = req.userId;
	const {
		telephoneNumber,
		fax,
		address1,
		address2,
		title,
		logoRef,
		taxAdministration,
		taxNumber,
		province,
		district,
		email,
		state,
	} = req.body;

	User.findById(userId)
		.then((user) => {
			const companyId = user.companyId;
			return Company.update(
				companyId,
				telephoneNumber,
				fax,
				address1,
				address2,
				title,
				logoRef,
				taxAdministration,
				taxNumber,
				province,
				district,
				email,
				state
			);
		})
		.then((updatedCompany) => {
			return res.json({
				result: true,
				updatedCompany,
			});
		})
		.catch((err) => {
			next(err);
		});
};
