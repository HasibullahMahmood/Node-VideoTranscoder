const sql = require('mssql');

module.exports = class Countries {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.query(`SELECT * FROM Countries;`);
			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
