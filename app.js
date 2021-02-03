// THIRD PARTY LIBRARIES IMPORT
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer'); // for uploading files

// LOCAL FILES IMPORT
const db = require('./util/database');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const userRoutes = require('./routes/user');

const { fileFilter, fileStorage } = require('./util/fileMethods');

const app = express();
app.use(bodyParser.json()); // application/json

// SAVE THE IMAGES
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

// SERVER CONFIGURATION
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	next();
});

// app.use((req, res, next) => {
// 	console.log(req.url);
// 	console.log(req.body);
// 	next();
// });

// ROUTES HERE
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/user', userRoutes);

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
