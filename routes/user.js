const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/user');
const isAuthActive = require('../middleware/isAuth&Active');
const User = require('../models/user');

const router = express.Router();

// /user/current-user
router.get('/current-user', isAuthActive, userController.getData);

// /user/company-users
router.get('/company-users', isAuthActive, userController.getACompanyUsers);

// /user/update-user
router.put(
	'/update-user',
	isAuthActive,
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email.')
			.normalizeEmail(),
		body('name').trim().not().isEmpty(),
		body('id').trim().not().isEmpty(),
	],
	userController.updateUser
);

// /user/add-user
router.post(
	'/add-user',
	isAuthActive,
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email.')
			.custom((email, { req }) => {
				return User.findByEmail(email).then((user) => {
					if (user) {
						return Promise.reject('E-Mail address already exists!');
					}
				});
			})
			.normalizeEmail(),
		body('password').trim().isLength({ min: 5 }),
		body('name').trim().not().isEmpty(),
	],
	userController.addUser
);

// /user/delete-user
router.delete(
	'/delete-user',
	isAuthActive,
	[body('id').trim().not().isEmpty()],
	userController.deleteUser
);

module.exports = router;
