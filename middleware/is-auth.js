const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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
	req.userId = decodedToken.userId;
	next();
};
