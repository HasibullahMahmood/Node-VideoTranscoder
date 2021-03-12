const sql = require('mssql');

module.exports = class Features {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.query(`SELECT * FROM Features;`);
			return result.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
