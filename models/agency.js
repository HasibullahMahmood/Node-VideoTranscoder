const sql = require('mssql');

module.exports = class Agency {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const agencies = await pool
				.request()
				.query(`SELECT * FROM Agency;`);
			return agencies.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
