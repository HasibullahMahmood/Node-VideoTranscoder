const Property_Rules = require('../models/property_rules');
const { checkValidationError } = require('../util/utilityFunctions');

exports.getProperty_Rules = async (req, res, next) => {
	try {
		checkValidationError(req);

		const { propertyId } = req.query;
		const property_rules = await Property_Rules.getProperty_Rules(
			propertyId
		);
		return res.json({
			result: true,
			property_rules,
		});
	} catch (error) {
		next(error);
	}
};

exports.addDeleteRules = async (req, res, next) => {
	try {
		checkValidationError(req);
		const { propertyId, property_rules } = req.body;

		// find new added rules
		const newAddedRules = property_rules.filter((p) => {
			return !p.hasOwnProperty('id');
		});

		// not deleted Rules, OR, the records that already exists in the table
		const notDeletedRules = property_rules.filter((p) => {
			return p.hasOwnProperty('id');
		});

		const notDeletedRulesIds = notDeletedRules.map((pr) => {
			return pr.id;
		});

		await Property_Rules.deletePRExceptThese(
			notDeletedRulesIds,
			propertyId
		);

		// add new added rules to the db
		if (newAddedRules.length > 0) {
			await Property_Rules.addProperty_Rules(newAddedRules);
		}

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
