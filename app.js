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

const app = express();
app.use(bodyParser.json()); // application/json
app.use(cors());

app.use(
	'/companyLogo',
	express.static(path.join(__dirname, 'public', 'companyLogo'))
);

// ROUTES HERE
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/user', userRoutes);
app.use('/property', propertyRoutes);
app.use('/property-types', propertyTypesRoutes);
app.use('/features', featuresRoutes);
app.use('/property-features', property_featuresRoutes);

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
