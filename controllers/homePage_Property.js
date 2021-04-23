const HomePage_Property = require('../models/homePage_Property');

exports.getProperties = async (req, res, next) => {
	try {
		const properties = await HomePage_Property.fetchAll();
		return res.json({
			result: true,
			properties,
		});
	} catch (error) {
		next(error);
	}
};
