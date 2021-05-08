// THIRD PARTY LIBRARIES IMPORT
const path = require('path');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');

app.use(bodyParser.json()); // application/json
app.use(cors());

app.use('/videos', express.static(path.join(__dirname, 'public', 'videos')));

// CATCH THE ERROR
app.use((error, req, res, next) => {
	const message = error.message;
	const data = error.data;
	res.json({ message: message, data: data, result: false });
});

const server = app.listen(5000, () => {
	console.log('Server started successfully.');
});

// INITIALIZE SOCKET.IO
require('./socket').initIO(server);

// LOCAL FILES IMPORT
const videoRoutes = require('./routes/video');
const downloadRoutes = require('./routes/download');
const streamRoutes = require('./routes/stream');

// ROUTES HERE
app.use('/videos', videoRoutes);
app.use('/download', downloadRoutes);
app.use('/stream', streamRoutes);
