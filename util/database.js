const sql = require('mssql');

const config = {
	user: 'sa',
	password: 'vihobook.48',
	server: 'HAYRI-YILMAZ-12\\SQLEXPRESS',
	database: 'vihobook',
	options: {
		trustedconnection: true,
		enableArithAbort: true,
		instancename: 'VIHOBOOK',
	},
	pool: {
		max: 500,
		min: 1,
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
