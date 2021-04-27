exports.addVideo = async (req, res, next) => {
	try {
		let {
			selectedVideoFormat,
			selectedCodec,
			selectedResolutions,
		} = req.body;

		selectedVideoFormat = await JSON.parse(selectedVideoFormat);
		selectedCodec = await JSON.parse(selectedCodec);
		selectedResolutions = await JSON.parse(selectedResolutions);

		console.log(selectedVideoFormat);
		console.log(selectedCodec);
		console.log(selectedResolutions);

		return res.json({
			result: true,
		});
	} catch (error) {
		next(error);
	}
};
