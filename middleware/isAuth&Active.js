const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
	try {
		const authHeader = req.get('Authorization');
		if (!authHeader) {
			const error = new Error('Not authenticated.');
			throw error;
		}
		const token = authHeader.split(' ')[1];

		let decodedToken = jwt.verify(token, 'somesupersecretsecret');

		if (!decodedToken) {
			const error = new Error('Not authenticated.');
			throw error;
		}

		const userId = decodedToken.userId;
		const currentUser = await User.findById(userId);
		const isSuperUser = currentUser.isSuperUser;
		const companyId = currentUser.companyId;
		const isActive = currentUser.status;

		if (!isActive) {
			const error = new Error('You are blocked!');
			throw error;
		}

		req.userId = userId;
		req.isSuperUser = isSuperUser;
		req.companyId = companyId;
		next();
	} catch (error) {
		next(error);
	}
};
