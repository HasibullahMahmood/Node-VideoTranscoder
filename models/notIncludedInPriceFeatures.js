const sql = require('mssql');

module.exports = class IncludedInPriceFeatures {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.query(`SELECT * FROM NotIncludedInPriceFeatures;`);
			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
