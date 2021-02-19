const sql = require('mssql');

module.exports = class IncludedInPriceFeatures {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const includedInPriceFeatures = await pool
				.request()
				.query(`SELECT * FROM IncludedInPriceFeatures;`);
			return includedInPriceFeatures.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
