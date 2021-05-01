const convertVideo = require("../util/converterFunction");

exports.addVideo = async (req, res, next) => {
  try {
    let { selectedVideoFormat, selectedCodec, selectedResolutions } = req.body;
    let { destination, filename, path } = req.file;

    selectedVideoFormat = await JSON.parse(selectedVideoFormat);
    selectedCodec = await JSON.parse(selectedCodec);
    selectedResolutions = await JSON.parse(selectedResolutions);

    console.log(selectedVideoFormat);
    console.log(selectedCodec);
    console.log(selectedResolutions);

    selectedResolutions.forEach((resolutions) => {
      let outputFilePath =
        destination +
        "\\" +
        filename.split(".")[0] +
        "_" +
        resolutions.size +
        "." +
        selectedVideoFormat.label;

      console.log(selectedVideoFormat.label);
      console.log(selectedCodec.label);
      console.log(resolutions.size);
      convertVideo(
        path,
        outputFilePath,
        selectedVideoFormat.label,
        selectedCodec.label,
        resolutions.size
      );
    });
    return res.json({
      result: true,
    });
  } catch (error) {
    next(error);
  }
};
