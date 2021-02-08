const sql = require('mssql');

module.exports = class Company {
	constructor(name) {
		this.name = name;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedCompany = await pool
				.request()
				.input('name', sql.NVarChar, this.name)
				.query(
					`INSERT INTO Companies (name) VALUES(@name); 
					 SELECT * FROM Companies WHERE id = SCOPE_IDENTITY();`
				);
			return insertedCompany.recordset[0];
		} catch (err) {
			console.log('Error in saving the company: ');
			console.log(err);
			throw err;
		}
	};

	static update = async (
		id,
		telephoneNumber = '',
		country = '',
		address1 = '',
		address2 = '',
		title = '',
		logoRef = '',
		taxAdministration = '',
		taxNumber = '',
		province = '',
		district = '',
		email = '',
		state = ''
	) => {
		try {
			let pool = await sql.connect();
			let updatedCompany = await pool
				.request()
				.input('id', sql.Int, id)
				.input('telephoneNumber', sql.NVarChar, telephoneNumber)
				.input('country', sql.NVarChar, country)
				.input('address1', sql.NVarChar, address1)
				.input('address2', sql.NVarChar, address2)
				.input('title', sql.NVarChar, title)
				.input('logoRef', sql.NVarChar, logoRef)
				.input('taxAdministration', sql.NVarChar, taxAdministration)
				.input('taxNumber', sql.NVarChar, taxNumber)
				.input('province', sql.NVarChar, province)
				.input('district', sql.NVarChar, district)
				.input('email', sql.NVarChar, email)
				.input('state', sql.Bit, state)

				.query(
					`UPDATE Companies
					 	SET 
							telephoneNumber = @telephoneNumber,
							country = @country,
							address1 = @address1,
							address2 = @address2,
							title = @title,
							logoRef = @logoRef,
							taxAdministration = @taxAdministration,
							taxNumber = @taxNumber,
							province = @province,
							district = @district,
							email = @email,
							state = @state
						WHERE Companies.id=@id;
					
					SELECT * FROM Companies WHERE Companies.id=@id;
					`
				);
			return updatedCompany.recordset[0];
		} catch (err) {
			console.log('Error in updating the company: ');
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

	static findById = async (id) => {
		try {
			let pool = await sql.connect();
			let user = await pool
				.request()
				.input('id', sql.Int, id)
				.query(`SELECT * FROM Companies WHERE Companies.id = @id`);

			return user.recordset[0];
		} catch (err) {
			console.log(err);
		}
	};
};
