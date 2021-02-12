const { validationResult } = require('express-validator/check');
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const checkIsSuperUser = (req) => {
	const isSuperUser = req.isSuperUser;
	if (!isSuperUser) {
		throw new Error('You are not authorized to access this');
	}
};

const checkValidationError = (req) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let message = errors.array()[0].param + ' ' + errors.array()[0].msg;
		message = capitalizeFirstLetter(message);
		const error = new Error(message);
		throw error;
	}
};

module.exports = {
	capitalizeFirstLetter,
	checkIsSuperUser,
	checkValidationError,
};
