const { validationResult } = require('express-validator/check');
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const checkValidationError = (req) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let message = errors.array()[0].param + ' ' + errors.array()[0].msg;
		message = capitalizeFirstLetter(message);
		const error = new Error(message);
		throw error;
	}
};

const getCurrentDate = () => {
	let date = new Date();
	let month = date.getMonth() + 1;
	return (currentDate =
		date.getFullYear() + '-' + month + '-' + date.getDate());
};

const getCurrentTime = () => {
	let date = new Date();
	return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};

const getCurrentDateTime = () => {
	return getCurrentDate() + ' ' + getCurrentTime();
};

const addDays = (date, days) => {
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

module.exports = {
	capitalizeFirstLetter,
	checkValidationError,
	getCurrentDate,
	getCurrentTime,
	getCurrentDateTime,
	addDays,
};
