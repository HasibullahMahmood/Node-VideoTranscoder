const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		const error = new Error('Not authenticated.');
		throw error;
	}
	const token = authHeader.split(' ')[1];

	let decodedToken;
	try {
		decodedToken = jwt.verify(token, 'somesupersecretsecret');
	} catch (err) {
		throw err;
	}
	if (!decodedToken) {
		const error = new Error('Not authenticated.');
		throw error;
	}

	const userId = decodedToken.userId;
	let isSuperUser;
	let companyId;

	try {
		const currentUser = await User.findById(userId);
		isSuperUser = currentUser.isSuperUser;
		companyId = currentUser.companyId;
		const isActive = currentUser.status;
		if (!isActive) {
			const error = new Error('You are blocked!');
			throw error;
		}
	} catch (error) {
		throw error;
	}
	req.userId = userId;
	req.isSuperUser = isSuperUser;
	req.companyId = companyId;
	next();
};
