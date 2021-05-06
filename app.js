// THIRD PARTY LIBRARIES IMPORT
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(bodyParser.json()); // application/json
app.use(cors());

app.use("/videos", express.static(path.join(__dirname, "public", "videos")));

// CATCH THE ERROR
app.use((error, req, res, next) => {
  const message = error.message;
  const data = error.data;
  res.json({ message: message, data: data, result: false });
});

const server = app.listen(5000, () => {
  console.log("Server started successfully.");
});

// INITIALIZE SOCKET.IO
require("./socket").initIO(server);

// LOCAL FILES IMPORT
const videoRoutes = require("./routes/video");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "\\" + "index.html");
});

app.get("/video/:folder/:file", function (req, res) {
  const vFile = req.params.file;
  const vFolder = req.params.folder;

  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = `.\\public\\videos\\${vFolder}\\${vFile}`;
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

// ROUTES HERE
app.use("/videos", videoRoutes);
