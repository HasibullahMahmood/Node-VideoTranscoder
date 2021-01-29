const sql = require('mssql');

module.exports = class Company {
	constructor(companyName) {
		this.companyName = companyName;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedCompany = await pool
				.request()
				.input('companyName', sql.NVarChar, this.companyName)
				.query(
					`INSERT INTO Companies (companyName) VALUES(@companyName); 
					 SELECT * FROM Companies WHERE id = SCOPE_IDENTITY();`
				);
			return insertedCompany.recordset[0];
		} catch (err) {
			console.log('Error in saving the company: ');
			console.log(err);
			throw err;
		}
	};

	static fetchAll = async () => {
		try {
			let pool = await sql.connect();
			let companies = await pool
				.request()
				.query(`SELECT * FROM Companies`);
			return companies.recordsets;
		} catch (err) {
			console.log(err);
		}
	};
};
