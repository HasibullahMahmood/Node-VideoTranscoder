const sql = require('mssql');

module.exports = class Places {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const places = await pool.request().query(`SELECT * FROM Places;`);
			return places.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
