const sql = require('mssql');

module.exports = class PropertyType {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const propertyTypes = await pool
				.request()
				.query(`SELECT * FROM PropertyTypes;`);
			return propertyTypes.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
