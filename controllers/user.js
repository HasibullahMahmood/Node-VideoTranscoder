const User = require('../models/user');

exports.getData = (req, res, next) => {
	const userId = req.userId;

	User.findById(userId)
		.then((user) => {
			return res.json({
				result: true,
				user,
			});
		})
		.catch((err) => {
			next(err);
		});
};
