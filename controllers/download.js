const path = require('path');

exports.manageDownload = async (req, res, next) => {
	try {
		const folderName = req.query['folder-name'];
		const fileName = req.query['file-name'];

		const fullPath = path.join(__dirname, '..', 'public', 'videos', folderName, fileName);

		return res.download(fullPath, (error) => {
			if (error) {
				console.log('Error downloading video: ', error);
				throw error;
			}
		});
	} catch (error) {
		next(error);
	}
};
