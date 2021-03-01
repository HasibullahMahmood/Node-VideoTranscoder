const Property_Categories = require('../models/property_categories');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getProperty_Categories = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { propertyId } = req.query;
		const property_categories = await Property_Categories.getProperty_Categories(
			propertyId
		);
		return res.json({
			result: true,
			property_categories,
		});
	} catch (error) {
		next(error);
	}
};

exports.addDeleteCategories = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { propertyId, property_categories } = req.body;

		// find new added categories
		const newAddedCategories = property_categories.filter((p) => {
			return !p.hasOwnProperty('id');
		});

		// not deleted categories, OR, the records that already exists in the table
		const notDeletedCategories = property_categories.filter((p) => {
			return p.hasOwnProperty('id');
		});

		const notDeletedCategoriesIds = notDeletedCategories.map((pc) => {
			return pc.id;
		});

		await Property_Categories.deletePCExceptThese(
			notDeletedCategoriesIds,
			propertyId
		);

		// add new added categories to the db
		if (newAddedCategories.length > 0) {
			await Property_Categories.addProperty_Categories(
				newAddedCategories
			);
		}

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
