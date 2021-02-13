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
		companyId
	) {
		this.name = name;
		this.shortName = shortName;
		this.propertyTypeId = propertyTypeId;
		this.capacity = capacity;
		this.bedroomNumber = bedroomNumber;
		this.bedNumber = bedNumber;
		this.bathroomNumber = bathroomNumber;
		this.hasSwimmingPool = hasSwimmingPool;
		this.companyId = companyId;
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
				.input('companyId', sql.Int, this.companyId)
				.query(`INSERT INTO Properties 
                    (name, shortName, propertyTypeId, capacity, bedroomNumber, bedNumber, bathroomNumber, hasSwimmingPool, companyId) 
					VALUES(@name, @shortName, @propertyTypeId, @capacity, @bedroomNumber, @bedNumber, @bathroomNumber, @hasSwimmingPool, @companyId);
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
		companyId
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
				.input('companyId', sql.Int, companyId)
				.query(`UPDATE Properties 
					SET name=@name,
                        shortName=@shortName,
                        propertyTypeId=@propertyTypeId,
                        capacity=@capacity,
                        bedroomNumber=@bedroomNumber,
                        bedNumber=@bedNumber,
                        bathroomNumber=@bathroomNumber,
                        hasSwimmingPool=@hasSwimmingPool,
                        companyId=@companyId
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
