const Company = require('../models/company');
const { clearImage } = require('../util/fileMethods');

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
			countryId,
			address1,
			address2,
			title,
			taxAdministration,
			taxNumber,
			provinceId,
			districtId,
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

		await Company.update(
			req.companyId,
			name,
			telephoneNumber,
			countryId,
			address1,
			address2,
			title,
			logoRef,
			taxAdministration,
			taxNumber,
			provinceId,
			districtId,
			email,
			1
		);

		const updatedCompany = await Company.findById(req.companyId);

		return res.json({
			result: true,
			updatedCompany,
		});
	} catch (error) {
		next(error);
	}
};
