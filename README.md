# Node-VideoConverter


## NODE.JS
install node.js which comes with npm(node package manager) from the Official website: https://nodejs.org/en/download/

Check the installed versions
> node -v
> 
> npm -v

## CLONE THIS REPO

> git clone https://github.com/HasibullahMahmood/Node-VideoTranscoder.git
> 
> cd Node-VideoConverter
 
Install required dependencies 
> npm install


## FFMPEG
This software is used by fluent-ffmpeg (https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) node package.
Follow the following demo to install FFMPEG successfully. 
https://www.wikihow.com/Install-FFmpeg-on-Windows

## FLUENT-FFMPEG SETTINGS
As the absolute path of ffmpeg is used in `/Node-VideoConverter/controllers/video.js`
be sure that ffmpeg software is placed under your C disk folder. e.g. C:/ffmpeg/bin/*


## START THE NODE SERVER (uses port 5000) 
> npm start

