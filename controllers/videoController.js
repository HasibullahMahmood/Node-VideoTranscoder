const convertVideo = require('../util/converterFunction');

exports.addVideo = async (req, res, next) => {
	try {
		let { selectedVideoFormat, selectedCodec, selectedResolutions } = req.body;

		let { destination, filename, path } = req.file;

		selectedVideoFormat = await JSON.parse(selectedVideoFormat);
		selectedCodec = await JSON.parse(selectedCodec);
		selectedResolutions = await JSON.parse(selectedResolutions);

		selectedResolutions.forEach((resolution) => {
			let outputFilePath =
				destination +
				'\\' +
				filename.split('.')[0] +
				'_' +
				resolution.size +
				'_' +
				selectedCodec.label +
				'Codec' +
				'.' +
				selectedVideoFormat.label;

			convertVideo(
				(inputPath = path),
				outputFilePath,
				selectedVideoFormat.label,
				selectedCodec.label,
				resolution.size
			);
		});

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
