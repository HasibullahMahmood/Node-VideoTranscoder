const sql = require('mssql');

module.exports = class Categories {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const categories = await pool
				.request()
				.query(`SELECT * FROM Categories;`);
			return categories.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
