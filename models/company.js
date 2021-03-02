const sql = require('mssql');

module.exports = class Company {
	constructor(name) {
		this.name = name;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedCompanyId = await pool
				.request()
				.input('name', sql.NVarChar, this.name)
				.query(
					`INSERT INTO Companies (name, state) VALUES(@name, 1); 
					 SELECT SCOPE_IDENTITY();`
				);
			return { id: Object.values(insertedCompanyId.recordset[0])[0] };
		} catch (err) {
			console.log('Error in saving the company: ');
			console.log(err);
			throw err;
		}
	};

	static update = async (
		id,
		name = 'Company Name',
		telephoneNumber = '',
		countryId = '',
		address1 = '',
		address2 = '',
		title = '',
		logoRef = '',
		taxAdministration = '',
		taxNumber = '',
		provinceId = '',
		districtId = '',
		email = '',
		state = ''
	) => {
		try {
			let pool = await sql.connect();
			let updatedCompany = await pool
				.request()
				.input('id', sql.Int, id)
				.input('name', sql.NVarChar, name)
				.input('telephoneNumber', sql.NVarChar, telephoneNumber)
				.input('countryId', sql.Int, countryId)
				.input('address1', sql.NVarChar, address1)
				.input('address2', sql.NVarChar, address2)
				.input('title', sql.NVarChar, title)
				.input('logoRef', sql.NVarChar, logoRef)
				.input('taxAdministration', sql.NVarChar, taxAdministration)
				.input('taxNumber', sql.NVarChar, taxNumber)
				.input('provinceId', sql.Int, provinceId)
				.input('districtId', sql.Int, districtId)
				.input('email', sql.NVarChar, email)
				.input('state', sql.Bit, state)

				.query(
					`UPDATE Companies
					 	SET 
							telephoneNumber = @telephoneNumber,
							name = @name,
							countryId = @countryId,
							address1 = @address1,
							address2 = @address2,
							title = @title,
							logoRef = @logoRef,
							taxAdministration = @taxAdministration,
							taxNumber = @taxNumber,
							provinceId = @provinceId,
							districtId = @districtId,
							email = @email,
							state = @state
						WHERE Companies.id=@id;
					`
				);
			return updatedCompany.recordset;
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
			throw err;
		}
	};

	static findById = async (id) => {
		try {
			let pool = await sql.connect();
			let user = await pool.request().input('id', sql.Int, id)
				.query(`SELECT Companies.*,
							Countries.name as countryName, Provinces.name as provinceName,
							Districts.name as districtName
							FROM Companies 
							LEFT JOIN Countries on Companies.countryId=Countries.id
							LEFT JOIN Provinces on Companies.provinceId=Provinces.id
							LEFT JOIN Districts on Companies.districtId=Districts.id
							WHERE Companies.id = @id;`);

			return user.recordset[0];
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
