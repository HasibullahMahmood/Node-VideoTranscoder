// THIRD PARTY LIBRARIES IMPORT
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// LOCAL FILES IMPORT
const videoRoutes = require('./routes/video');

const app = express();
app.use(bodyParser.json()); // application/json
app.use(cors());

app.use('/videos', express.static(path.join(__dirname, 'public', 'videos')));

// ROUTES HERE
app.use('/videos', videoRoutes);

// CATCH THE ERROR
app.use((error, req, res, next) => {
	const message = error.message;
	const data = error.data;
	res.json({ message: message, data: data, result: false });
});

app.listen(5000, () => {
	console.log('The server is running successfully!');
});
