const sql = require('mssql');

module.exports = class Districts {
	static findByProvinceId = async (provinceId) => {
		try {
			const pool = await sql.connect();
			const districts = await pool
				.request()
				.input('provinceId', sql.Int, provinceId).query(`SELECT *
						FROM Districts 
						WHERE Districts.provinceId = @provinceId`);

			return districts.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
