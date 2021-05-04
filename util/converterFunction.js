const ffmpeg = require('fluent-ffmpeg');

// FLUENT-FFMPEG SETTINGS
ffmpeg.setFfmpegPath('C:/Program Files/FFMPEG/ffmpeg.exe');
ffmpeg.setFfprobePath('C:/Program Files/FFMPEG/ffprobe.exe');
ffmpeg.setFlvtoolPath('C:/Program Files/FFMPEG/flvtool2.exe');

function convertVideo(inputPath, outputPath, videoFormat, videoCodec, videoResolution) {
	console.log({ 'inputPath: ': inputPath });
	console.log({ 'outputPath: ': outputPath });
	console.log({ 'videoFormat: ': videoFormat });
	console.log({ 'videoCodec: ': videoCodec });
	console.log({ 'videoResolution: ': videoResolution });

	ffmpeg(inputPath)
		.size(videoResolution)
		//set video codec
		.videoCodec(videoCodec)
		//set output format
		.format(videoFormat)
		// setup event handlers

		.on('start', (commandLine) => {
			console.log('Ffmpeg Started with command: ' + commandLine);
		})
		.on('codecData', (data) => {
			console.log('codecData: ', data);
		})
		.on('progress', (progress) => {
			let { currentKbps, percent } = progress;
			console.log('progress: ', currentKbps, percent);
		})
		.on('end', () => {
			console.log(videoResolution + ' file has been converted succesfully');
		})
		.on('error', (err) => {
			console.log('an error happened: ' + err.message);
		})
		// .on('stderr', function (stderrLine) {
		// 	console.log('Stderr output: ' + stderrLine);
		// })

		// save to file
		.save(outputPath);
}

module.exports = convertVideo;
