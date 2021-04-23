const fs = require('fs');
const path = require('path');

exports.getPathes = async (req, res, next) => {
	try {
		const imageFolder = path.join(
			__dirname,
			'..',
			'public',
			'mainWebHomePagePhotos'
		);
		const images = await fs.promises.readdir(imageFolder);
		let imagePathes = [];
		for (const image of images) {
			imagePathes.push({ path: '/homePagePhotos/' + image });
		}
		res.json({ result: true, imagePathes });
	} catch (error) {
		next(error);
	}
};
