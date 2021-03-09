const sql = require('mssql');

module.exports = class PaymentMethods {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.query(`SELECT * FROM PaymentMethods;`);
			return result.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
