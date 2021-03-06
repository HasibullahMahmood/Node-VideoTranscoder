const sql = require('mssql');
const { getCurrentDateTime } = require('../util/utilityFunctions');

module.exports = class AgencyPrice {
	constructor(
		contractName,
		agency_id,
		property_id,
		startingDate,
		endDate,
		price,
		currency_id,
		companies_id
	) {
		this.contractName = contractName;
		this.agency_id = agency_id;
		this.property_id = property_id;
		this.startingDate = startingDate;
		this.endDate = endDate;
		this.price = price;
		this.currency_id = currency_id;
		this.companies_id = companies_id;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedOne = await pool
				.request()
				.input('contractName', sql.NVarChar, this.contractName)
				.input('agency_id', sql.Int, this.agency_id)
				.input('property_id', sql.Int, this.property_id)
				.input('startingDate', sql.Date, this.startingDate)
				.input('endDate', sql.Date, this.endDate)
				.input('price', sql.VarChar, this.price)
				.input('currency_id', sql.Int, this.currency_id)
				.input('createdAt', sql.NVarChar, getCurrentDateTime())
				.input('companies_id', sql.Int, this.companies_id)
				.query(
					`INSERT INTO AgencyPrice (contractName, agency_id, property_id, startingDate,
						 endDate, price, currency_id, createdAt, companies_id) 
						 VALUES(@contractName, @agency_id, @property_id, @startingDate,
							 @endDate, @price, @currency_id, @createdAt, @companies_id); 
					 SELECT * FROM AgencyPrice WHERE AgencyPrice.id = SCOPE_IDENTITY();`
				);
			return insertedOne.recordset[0];
		} catch (err) {
			console.log('Error in saving the Agency Price: ');
			console.log(err);
			throw err;
		}
	};

	static update = async (
		id,
		contractName,
		agency_id,
		property_id,
		startingDate,
		endDate,
		price,
		currency_id,
		companies_id
	) => {
		try {
			let pool = await sql.connect();
			let updatedOne = await pool
				.request()
				.input('id', sql.Int, id)
				.input('contractName', sql.NVarChar, contractName)
				.input('agency_id', sql.Int, agency_id)
				.input('property_id', sql.Int, property_id)
				.input('startingDate', sql.Date, startingDate)
				.input('endDate', sql.Date, endDate)
				.input('price', sql.VarChar, price)
				.input('currency_id', sql.Int, currency_id)
				.input('updatedAt', sql.NVarChar, getCurrentDateTime())
				.input('companies_id', sql.Int, companies_id)

				.query(
					`UPDATE AgencyPrice
					 	SET 
							contractName = @contractName,
							agency_id = @agency_id,
							property_id = @property_id,
							startingDate = @startingDate,
							endDate = @endDate,
							price = @price,
							currency_id = @currency_id,
							updatedAt = @updatedAt,
							companies_id = @companies_id
						WHERE AgencyPrice.id=@id;
					SELECT * FROM AgencyPrice Where id = @id;
					`
				);
			return updatedOne.recordset[0];
		} catch (err) {
			console.log('Error in updating the AgencyPrice: ');
			console.log(err);
			throw err;
		}
	};

	static findById = async (id) => {
		try {
			let pool = await sql.connect();
			let result = await pool.request().input('id', sql.Int, id)
				.query(`SELECT AgencyPrice.*, Agency.name as agencyName, Property.name as propertyName, Currency.name as currencyName
							FROM AgencyPrice
							LEFT JOIN Agency ON AgencyPrice.agency_id = Agency.id
							LEFT JOIN Property ON AgencyPrice.property_id = Property.id
							LEFT JOIN Currency ON AgencyPrice.currency_id = Currency.id
							WHERE companies_id=@id;`);

			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
