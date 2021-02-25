const sql = require('mssql');

module.exports = class Property {
	constructor(
		name,
		shortName,
		propertyTypeId,
		capacity,
		bedroomNumber,
		bedNumber,
		bathroomNumber,
		hasSwimmingPool,
		status,
		companyId,
		countryId,
		provinceId,
		districtId,
		address,
		description
	) {
		this.name = name;
		this.shortName = shortName;
		this.propertyTypeId = propertyTypeId;
		this.capacity = capacity;
		this.bedroomNumber = bedroomNumber;
		this.bedNumber = bedNumber;
		this.bathroomNumber = bathroomNumber;
		this.hasSwimmingPool = hasSwimmingPool;
		this.status = status;
		this.companyId = companyId;
		this.countryId = countryId;
		this.provinceId = provinceId;
		this.districtId = districtId;
		this.address = address;
		this.description = description;
	}

	save = async () => {
		try {
			const pool = await sql.connect();
			const insertedUser = await pool
				.request()
				.input('name', sql.NVarChar, this.name)
				.input('shortName', sql.NVarChar, this.shortName)
				.input('propertyTypeId', sql.Int, this.propertyTypeId)
				.input('capacity', sql.Int, this.capacity)
				.input('bedroomNumber', sql.Int, this.bedroomNumber)
				.input('bedNumber', sql.Int, this.bedNumber)
				.input('bathroomNumber', sql.Int, this.bathroomNumber)
				.input('hasSwimmingPool', sql.Bit, this.hasSwimmingPool)
				.input('status', sql.Bit, this.status)
				.input('companyId', sql.Int, this.companyId)
				.input('countryId', sql.Int, this.countryId)
				.input('provinceId', sql.Int, this.provinceId)
				.input('districtId', sql.Int, this.districtId)
				.input('address', sql.NVarChar, this.address)
				.input('description', sql.NVarChar, this.description)
				.query(`INSERT INTO Properties 
                    (name, shortName, propertyTypeId, capacity, bedroomNumber,
						 bedNumber, bathroomNumber, hasSwimmingPool,status, companyId,
						 countryId, provinceId, districtId, address, description) 
					VALUES(@name, @shortName, @propertyTypeId, @capacity, @bedroomNumber, 
						@bedNumber, @bathroomNumber, @hasSwimmingPool, @status, @companyId,
						@countryId, @provinceId, @districtId, @address, @description);
					SELECT id FROM Properties WHERE id = SCOPE_IDENTITY();`);
			return insertedUser.recordset[0];
		} catch (err) {
			console.log('Error in saving the property: ');
			console.log(err);
			throw err;
		}
	};

	static fetchAll = async (companyId) => {
		try {
			const pool = await sql.connect();
			const properties = await pool
				.request()
				.input('companyId', sql.Int, companyId)
				.query(
					`SELECT * FROM Properties WHERE Properties.companyId = @companyId;`
				);
			return properties.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	static update = async (
		id,
		name,
		shortName,
		propertyTypeId,
		capacity,
		bedroomNumber,
		bedNumber,
		bathroomNumber,
		hasSwimmingPool,
		status,
		companyId,
		countryId,
		provinceId,
		districtId,
		address,
		description
	) => {
		try {
			const pool = await sql.connect();
			const updatedProperty = await pool
				.request()
				.input('id', sql.Int, id)
				.input('name', sql.NVarChar, name)
				.input('shortName', sql.NVarChar, shortName)
				.input('propertyTypeId', sql.Int, propertyTypeId)
				.input('capacity', sql.Int, capacity)
				.input('bedroomNumber', sql.Int, bedroomNumber)
				.input('bedNumber', sql.Int, bedNumber)
				.input('bathroomNumber', sql.Int, bathroomNumber)
				.input('hasSwimmingPool', sql.Bit, hasSwimmingPool)
				.input('status', sql.Bit, status)
				.input('companyId', sql.Int, companyId)
				.input('countryId', sql.Int, countryId)
				.input('provinceId', sql.Int, provinceId)
				.input('districtId', sql.Int, districtId)
				.input('address', sql.NVarChar, address)
				.input('description', sql.NVarChar, description)
				.query(`UPDATE Properties 
					SET name=@name,
                        shortName=@shortName,
                        propertyTypeId=@propertyTypeId,
                        capacity=@capacity,
                        bedroomNumber=@bedroomNumber,
                        bedNumber=@bedNumber,
                        bathroomNumber=@bathroomNumber,
                        hasSwimmingPool=@hasSwimmingPool,
                        status=@status,
                        companyId=@companyId,
                        countryId=@countryId,
                        provinceId=@provinceId,
                        districtId=@districtId,
                        address=@address,
                        description=@description
						
						WHERE Properties.id=@id;

					SELECT *
					FROM Properties
					WHERE Properties.id=@id;`);

			return updatedProperty.recordset[0];
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static deleteProperty = async (propertyId, companyId) => {
		try {
			const pool = await sql.connect();
			const obj = await pool
				.request()
				.input('propertyId', sql.Int, propertyId)
				.input('companyId', sql.Int, companyId)
				.query(
					`DELETE FROM Properties WHERE Properties.id = @propertyId AND Properties.companyId=@companyId;`
				);
			return obj;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
