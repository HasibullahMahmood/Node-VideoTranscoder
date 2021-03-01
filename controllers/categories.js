const Categories = require('../models/categories');

exports.getCategories = async (req, res, next) => {
	try {
		const categories = await Categories.fetchAll();
		return res.json({
			result: true,
			categories,
		});
	} catch (error) {
		next(error);
	}
};
