let io;

const initIO = (server) => {
	// start socket.io server and cache io value
	io = require('socket.io')(server);
	return io;
};

const getIO = () => {
	// return previously cached value
	if (!io) {
		throw new Error('must call .initIO(server) before you can call .getIO()');
	}
	return io;
};

module.exports = {
	initIO,
	getIO,
};
