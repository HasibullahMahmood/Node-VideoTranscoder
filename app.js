// THIRD PARTY LIBRARIES IMPORT
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// LOCAL FILES IMPORT
const db = require('./util/database');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/property');
const propertyTypesRoutes = require('./routes/propertyTypes');
const featuresRoutes = require('./routes/features');
const property_featuresRoutes = require('./routes/property_features');
const includedInPriceFeaturesRoutes = require('./routes/includedInPriceFeatures');
const property_includedInPriceFeaturesRoutes = require('./routes/property_includedInPriceFeatures');
const notIncludedInPriceFeaturesRoutes = require('./routes/notIncludedInPriceFeatures');
const property_notIncludedInPriceFeaturesRoutes = require('./routes/property_notIncludedInPriceFeatures');
const rulesRoutes = require('./routes/rules');
const property_rulesRoutes = require('./routes/property_rules');
const propertyPhotosRoutes = require('./routes/photo');

const app = express();
app.use(bodyParser.json()); // application/json
app.use(cors());

app.use(
	'/companyLogo',
	express.static(path.join(__dirname, 'public', 'companyLogo'))
);

app.use(
	'/propertyPhotos',
	express.static(path.join(__dirname, 'public', 'propertyPhotos'))
);

// ROUTES HERE
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/user', userRoutes);
app.use('/property', propertyRoutes);
app.use('/property-types', propertyTypesRoutes);
app.use('/features', featuresRoutes);
app.use('/property_features', property_featuresRoutes);
app.use('/included-in-price-features', includedInPriceFeaturesRoutes);
app.use(
	'/property_included-in-price-features',
	property_includedInPriceFeaturesRoutes
);
app.use('/not-included-in-price-features', notIncludedInPriceFeaturesRoutes);
app.use(
	'/property_not-included-in-price-features',
	property_notIncludedInPriceFeaturesRoutes
);
app.use('/rules', rulesRoutes);
app.use('/property_rules', property_rulesRoutes);
app.use('/property-photo', propertyPhotosRoutes);

// CATCH THE ERROR
app.use((error, req, res, next) => {
	const message = error.message;
	const data = error.data;
	res.json({ message: message, data: data, result: false });
});

// CONNECT TO DB AND THEN RUN THE SERVER
(async () => {
	const isConnected = await db.createConnectionPool();
	if (isConnected) {
		app.listen(5000, () => {
			console.log('The server is running successfully!');
		});
	} else {
		console.log('Database connection error...');
	}
})();
