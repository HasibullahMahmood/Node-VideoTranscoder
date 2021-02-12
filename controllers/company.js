const fs = require('fs');
const path = require('path');

const Company = require('../models/company');
const User = require('../models/user');
const {
	checkIsSuperUser,
	checkValidationError,
} = require('../util/utilityFunctions');

exports.getData = async (req, res, next) => {
	try {
		const companyId = req.companyId;
		const company = await Company.findById(companyId);
		return res.json({
			result: true,
			company,
		});
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	try {
		checkValidationError(req);
		checkIsSuperUser(req);
		const {
			name,
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

		const companyOldData = await Company.findById(req.companyId);
		if (
			logoRef !== companyOldData.logoRef &&
			companyOldData.logoRef != null
		) {
			clearImage(companyOldData.logoRef);
		}

		const updatedCompany = await Company.update(
			req.companyId,
			name,
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

		return res.json({
			result: true,
			updatedCompany,
		});
	} catch (error) {
		next(error);
	}
};

const clearImage = (filePath) => {
	if (filePath != null) {
		filePath = path.join(__dirname, '..', 'public', filePath);
		fs.unlink(filePath, (err) => {});
	}
};
