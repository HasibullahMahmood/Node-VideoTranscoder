const path = require('path');
const fs = require('fs');

exports.manageStream = async (req, res, next) => {
	try {
		const folderName = req.query['folder-name'];
		const fileName = req.query['file-name'];
		const videoPath = path.join(__dirname, '..', 'public', 'videos', folderName, fileName);

		const range = req.headers.range;
		if (!range) {
			return res.status(400).send('Requires Range header');
		}
		const videoSize = fs.statSync(videoPath).size;

		// Parse Range
		// Example: "bytes=32324-"
		const CHUNK_SIZE = 10 ** 6; // 1MB
		const start = Number(range.replace(/\D/g, ''));
		const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

		// Create headers
		const contentLength = end - start + 1;
		const headers = {
			'Content-Range': `bytes ${start}-${end}/${videoSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': contentLength,
			'Content-Type': 'video/mp4',
		};

		res.writeHead(206, headers);
		const videoStream = fs.createReadStream(videoPath, { start, end });
		videoStream.pipe(res);
	} catch (error) {
		next(error);
	}
};
