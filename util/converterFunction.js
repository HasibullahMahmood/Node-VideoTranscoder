var ffmpeg = require("fluent-ffmpeg");

function convertVideo(
  inputPath,
  outputPath,
  videoFormat,
  videoCodec,
  videoResolution
) {
  ffmpeg(inputPath)
    .size(videoResolution)
    //set video codec
    .videoCodec(videoCodec)
    //set output format
    .format(videoFormat)
    // setup event handlers
    .on("end", function () {
      console.log(videoResolution + " file has been converted succesfully");
    })
    .on("error", function (err) {
      console.log("an error happened: " + err.message);
    })
    // save to file
    .save(outputPath);
}

module.exports = convertVideo;
