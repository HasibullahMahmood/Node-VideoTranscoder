const sql = require('mssql');

const config = {
	user: 'sa',
	password: 'vihobook',
	server: 'localhost\\VIHOBOOK',
	database: 'vihobook',
	options: {
		trustedconnection: true,
		enableArithAbort: true,
		instancename: 'VIHOBOOK',
	},
	port: 1433,
};

const createConnectionPool = async () => {
	try {
		const pool = await sql.connect(config);
		return pool.connected;
	} catch (error) {
		console.log(error);
	}
};

module.exports = { createConnectionPool };
