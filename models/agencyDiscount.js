const sql = require('mssql');
const { getCurrentDateTime } = require('../util/utilityFunctions');

module.exports = class AgencyDiscount {
	constructor(
		discountName,
		agency_id,
		property_id,
		startingDate,
		endDate,
		discount,
		companies_id
	) {
		this.discountName = discountName;
		this.agency_id = agency_id;
		this.property_id = property_id;
		this.startingDate = startingDate;
		this.endDate = endDate;
		this.discount = discount;
		this.companies_id = companies_id;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedOne = await pool
				.request()
				.input('discountName', sql.NVarChar, this.discountName)
				.input('agency_id', sql.Int, this.agency_id)
				.input('property_id', sql.Int, this.property_id)
				.input('startingDate', sql.Date, this.startingDate)
				.input('endDate', sql.Date, this.endDate)
				.input('discount', sql.VarChar, this.discount)
				.input('createdAt', sql.NVarChar, getCurrentDateTime())
				.input('companies_id', sql.Int, this.companies_id)
				.query(
					`INSERT INTO AgencyDiscount (discountName, agency_id, property_id, startingDate,
						 endDate, discount, createdAt, companies_id) 
						 VALUES(@discountName, @agency_id, @property_id, @startingDate,
							 @endDate, @discount, @createdAt, @companies_id); 
					 SELECT * FROM AgencyDiscount WHERE AgencyDiscount.id = SCOPE_IDENTITY();`
				);
			return insertedOne.recordset[0];
		} catch (err) {
			console.log('Error in saving the Agency discount: ');
			console.log(err);
			throw err;
		}
	};

	static update = async (
		id,
		discountName,
		agency_id,
		property_id,
		startingDate,
		endDate,
		discount,
		companies_id
	) => {
		try {
			let pool = await sql.connect();
			let updatedOne = await pool
				.request()
				.input('id', sql.Int, id)
				.input('discountName', sql.NVarChar, discountName)
				.input('agency_id', sql.Int, agency_id)
				.input('property_id', sql.Int, property_id)
				.input('startingDate', sql.Date, startingDate)
				.input('endDate', sql.Date, endDate)
				.input('discount', sql.VarChar, discount)
				.input('updatedAt', sql.NVarChar, getCurrentDateTime())
				.input('companies_id', sql.Int, companies_id)

				.query(
					`UPDATE AgencyDiscount
					 	SET 
							discountName = @discountName,
							agency_id = @agency_id,
							property_id = @property_id,
							startingDate = @startingDate,
							endDate = @endDate,
							discount = @discount,
							updatedAt = @updatedAt,
							companies_id = @companies_id
						WHERE AgencyDiscount.id=@id;
					SELECT * FROM AgencyDiscount Where id = @id;
					`
				);
			return updatedOne.recordset[0];
		} catch (err) {
			console.log('Error in updating the AgencyDiscount: ');
			console.log(err);
			throw err;
		}
	};

	static fetchAll = async (id) => {
		try {
			let pool = await sql.connect();
			let result = await pool.request().input('id', sql.Int, id)
				.query(`SELECT AgencyDiscount.*, Agency.name as agencyName, Property.name as propertyName
							FROM AgencyDiscount
							LEFT JOIN Agency ON AgencyDiscount.agency_id = Agency.id
							LEFT JOIN Property ON AgencyDiscount.property_id = Property.id
							WHERE companies_id=@id;`);

			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	static fetchAllByConditiones = async (
		agency_id,
		property_id,
		checkIn,
		checkOut
	) => {
		try {
			let pool = await sql.connect();
			let result = await pool
				.request()
				.input('agency_id', sql.Int, agency_id)
				.input('property_id', sql.Int, property_id)
				.input('checkIn', sql.Date, checkIn)
				.input('checkOut', sql.Date, checkOut).query(`SELECT *
							FROM AgencyDiscount 
							WHERE agency_id = @agency_id AND property_id = @property_id AND
							(
								(@checkIn <= startingDate AND @checkOut >= endDate) OR
								(@checkIn >= startingDate AND @checkIn <= endDate) OR
								(@checkOut >= endDate AND @checkOut <= endDate) OR
								(@checkIn >= startingDate AND @checkOut <= endDate)
							);`);

			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	static delete = async (id, companies_id) => {
		try {
			let pool = await sql.connect();
			let result = await pool
				.request()
				.input('id', sql.Int, id)
				.input('companies_id', sql.Int, companies_id)
				.query(
					`DELETE FROM AgencyDiscount 
						WHERE AgencyDiscount.id = @id
						AND
						AgencyDiscount.companies_id=@companies_id;`
				);

			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
