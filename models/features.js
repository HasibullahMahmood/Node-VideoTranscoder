const sql = require('mssql');

module.exports = class Features {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const features = await pool
				.request()
				.query(`SELECT * FROM Features;`);
			return features.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
