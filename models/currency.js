const sql = require('mssql');

module.exports = class Currency {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const currencies = await pool
				.request()
				.query(`SELECT * FROM Currency;`);
			return currencies.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
