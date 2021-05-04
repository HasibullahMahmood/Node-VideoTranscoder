const io = require('../socket').getIO();
const ffmpeg = require('fluent-ffmpeg');

// FLUENT-FFMPEG SETTINGS
ffmpeg.setFfmpegPath('C:/Program Files/FFMPEG/ffmpeg.exe');
ffmpeg.setFfprobePath('C:/Program Files/FFMPEG/ffprobe.exe');
ffmpeg.setFlvtoolPath('C:/Program Files/FFMPEG/flvtool2.exe');

let client;
io.on('connection', (socket) => {
	client = socket;
	console.log('Client connected');
});

exports.manageVideo = async (req, res, next) => {
	try {
		let { selectedVideoFormat, selectedCodec, selectedResolutions } = req.body;
		let { destination, filename, path } = req.file;
		// parsing inputs
		selectedVideoFormat = await JSON.parse(selectedVideoFormat);
		selectedCodec = await JSON.parse(selectedCodec);
		selectedResolutions = await JSON.parse(selectedResolutions);

		selectedResolutions.map((resolution) => {
			let outputFilePath =
				destination +
				'\\' +
				filename.split('.')[0] +
				'-' +
				resolution.size +
				'-' +
				selectedCodec.label +
				'Codec' +
				'.' +
				selectedVideoFormat.label;

			convertVideo(
				(inputPath = path),
				outputFilePath,
				selectedVideoFormat.label,
				selectedCodec.label,
				resolution
			);
		});

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};

const convertVideo = (inputPath, outputPath, videoFormat, videoCodec, videoResolution) => {
	// console.log({ 'inputPath: ': inputPath });
	// console.log({ 'outputPath: ': outputPath });
	// console.log({ 'videoFormat: ': videoFormat });
	// console.log({ 'videoCodec: ': videoCodec });
	// console.log({ 'videoResolution: ': videoResolution });

	ffmpeg(inputPath)
		.size(videoResolution.size)
		//set video codec
		.videoCodec(videoCodec)
		//set output format
		.format(videoFormat)
		// setup event handlers

		.on('start', (commandLine) => {
			console.log('Ffmpeg Started with command: ');
			client.emit('Encoding', { action: 'start', resolution: videoResolution });
		})
		// .on('codecData', (data) => {
		// 	console.log('codecData: ', data);
		// })
		.on('progress', (progress) => {
			let { targetSize, percent } = progress;
			//console.log('progress: targetSize: ', targetSize + '  percent: ' + percent);
			client.emit('Encoding', { action: 'progress', resolution: videoResolution, targetSize, percent });
		})
		.on('end', () => {
			console.log(videoResolution.label + ' file has been converted succesfully');
			client.emit('Encoding', { action: 'end', resolution: videoResolution });
		})
		.on('error', (err) => {
			console.log('an error happened: ' + err.message);
		})
		// .on('stderr', function (stderrLine) {
		// 	console.log('Stderr output: ' + stderrLine);
		// })

		// save to file
		.save(outputPath);
};
