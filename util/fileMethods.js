const multer = require("multer"); // for uploading files
const path = require("path");
const fs = require("fs");

const getFileStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      let newFolderName =
        new Date().toISOString().replace(/:/g, "-") +
        "_" +
        Math.floor(Math.random() * 100);

      let videoPath = path.join(
        __dirname,
        "..",
        "public",
        "videos",
        newFolderName
      );

      if (!fs.existsSync(videoPath)) {
        fs.mkdirSync(videoPath, { recursive: true });
      }

      req.body.videoFolder = newFolderName;
      cb(null, videoPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "video/x-flv" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "application/x-mpegURL" ||
    file.mimetype === "video/MP2T" ||
    file.mimetype === "video/3gpp" ||
    file.mimetype === "video/quicktime" ||
    file.mimetype === "video/x-msvideo" ||
    file.mimetype === "video/mp1s" ||
    file.mimetype === "video/mp2p" ||
    file.mimetype === "video/x-ms-wmv"
  ) {
    cb(null, true);
  } else {
    console.log("Couldn't find file format in mime types");
    cb(null, false);
  }
};

const deleteFile = (filePath) => {
  if (filePath != null) {
    filePath = path.join(__dirname, "..", "public", filePath);
    fs.unlink(filePath, (err) => {});
  }
};

module.exports = {
  getFileStorage,
  fileFilter,
  deleteFile,
};
