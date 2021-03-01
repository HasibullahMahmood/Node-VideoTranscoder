const Places = require('../models/places');

exports.getPlaces = async (req, res, next) => {
	try {
		const places = await Places.fetchAll();
		return res.json({
			result: true,
			places,
		});
	} catch (error) {
		next(error);
	}
};
