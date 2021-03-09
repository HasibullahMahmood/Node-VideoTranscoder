const PaymentMethods = require('../models/paymentMethods');

exports.getPaymentMethods = async (req, res, next) => {
	try {
		const paymentMethods = await PaymentMethods.fetchAll();
		return res.json({
			result: true,
			paymentMethods,
		});
	} catch (error) {
		next(error);
	}
};
