const { validationResult } = require('express-validator/check');
const fs = require('fs');
const path = require('path');

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
	let companyId = '';
	const {
		telephoneNumber,
		country,
		address1,
		address2,
		title,
		taxAdministration,
		taxNumber,
		province,
		district,
		email,
	} = req.body;

	let logoRef = req.body.logoRef;
	if (req.file) {
		logoRef = 'companyLogo/' + req.file.filename;
	}

	User.findById(userId)
		.then((user) => {
			companyId = user.companyId;

			return Company.findById(companyId);
		})
		.then((companyOldData) => {
			if (
				logoRef !== companyOldData.logoRef &&
				companyOldData.logoRef != null
			) {
				clearImage(companyOldData.logoRef);
			}

			return Company.update(
				companyId,
				telephoneNumber,
				country,
				address1,
				address2,
				title,
				logoRef,
				taxAdministration,
				taxNumber,
				province,
				district,
				email,
				1
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

const clearImage = (filePath) => {
	if (filePath != null) {
		filePath = path.join(__dirname, '..', 'public', filePath);
		fs.unlink(filePath, (err) => console.log(err));
	}
};
