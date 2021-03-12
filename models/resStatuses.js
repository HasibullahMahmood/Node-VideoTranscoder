const sql = require('mssql');

module.exports = class ResStatuses {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.query(`SELECT * FROM ResStatuses;`);
			return result.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
