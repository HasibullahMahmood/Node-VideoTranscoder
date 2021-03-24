const sql = require('mssql');

module.exports = class Regions {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const regions = await pool
				.request()
				.query(`SELECT * FROM Regions;`);
			return regions.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
