const sql = require('mssql');

module.exports = class Provinces {
	static findByCountryId = async (countryId) => {
		try {
			const pool = await sql.connect();
			const provinces = await pool
				.request()
				.input('countryId', sql.Int, countryId).query(`SELECT *
						FROM Provinces 
						WHERE Provinces.countryId = @countryId`);

			return provinces.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
