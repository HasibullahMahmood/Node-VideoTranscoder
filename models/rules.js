const sql = require('mssql');

module.exports = class Features {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const rules = await pool.request().query(`SELECT * FROM Rules;`);
			return rules.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
