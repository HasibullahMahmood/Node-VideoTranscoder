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
		deposit,
		commission,
		englishDescription,
		frenchDescription,
		germanDescription,
		russianDescription,
		turkishDescription,
		arabicDescription
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
		this.deposit = deposit;
		this.commission = commission;
		this.englishDescription = englishDescription;
		this.frenchDescription = frenchDescription;
		this.germanDescription = germanDescription;
		this.russianDescription = russianDescription;
		this.turkishDescription = turkishDescription;
		this.arabicDescription = arabicDescription;
	}

	save = async () => {
		try {
			const pool = await sql.connect();
			const insertedProperty = await pool
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
				.input('deposit', sql.Int, this.deposit)
				.input('commission', sql.Int, this.commission)
				.input(
					'englishDescription',
					sql.NVarChar,
					this.englishDescription
				)
				.input(
					'frenchDescription',
					sql.NVarChar,
					this.frenchDescription
				)
				.input(
					'germanDescription',
					sql.NVarChar,
					this.germanDescription
				)
				.input(
					'russianDescription',
					sql.NVarChar,
					this.russianDescription
				)
				.input(
					'turkishDescription',
					sql.NVarChar,
					this.turkishDescription
				)
				.input(
					'arabicDescription',
					sql.NVarChar,
					this.arabicDescription
				).query(`INSERT INTO Property 
                    (name, shortName, propertyTypeId, capacity, bedroomNumber,
						 bedNumber, bathroomNumber, hasSwimmingPool,status, companyId,
						 countryId, provinceId, districtId, address, deposit, commission, englishDescription,
						 frenchDescription, germanDescription, russianDescription, turkishDescription,
						 arabicDescription)
					VALUES(@name, @shortName, @propertyTypeId, @capacity, @bedroomNumber, 
						@bedNumber, @bathroomNumber, @hasSwimmingPool, @status, @companyId,
						@countryId, @provinceId, @districtId, @address, @deposit, @commission, @englishDescription,
						 @frenchDescription, @germanDescription, @russianDescription, @turkishDescription,
						 @arabicDescription);
					SELECT id FROM Property WHERE id = SCOPE_IDENTITY();`);
			return insertedProperty.recordset[0];
		} catch (err) {
			console.log('Error in saving the property: ');
			console.log(err);
			throw err;
		}
	};

	static fetchAll = async (companyId) => {
		try {
			const pool = await sql.connect();
			const Property = await pool
				.request()
				.input('companyId', sql.Int, companyId)
				.query(
					`SELECT * FROM Property WHERE Property.companyId = @companyId;`
				);
			return Property.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	static fetchAllNames = async (companyId) => {
		try {
			const pool = await sql.connect();
			const Property = await pool
				.request()
				.input('companyId', sql.Int, companyId)
				.query(
					`SELECT id, name FROM Property WHERE Property.companyId = @companyId;`
				);
			return Property.recordset;
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
		deposit,
		commission,
		englishDescription,
		frenchDescription,
		germanDescription,
		russianDescription,
		turkishDescription,
		arabicDescription
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
				.input('deposit', sql.Int, deposit)
				.input('commission', sql.Int, commission)
				.input('englishDescription', sql.NVarChar, englishDescription)
				.input('frenchDescription', sql.NVarChar, frenchDescription)
				.input('germanDescription', sql.NVarChar, germanDescription)
				.input('russianDescription', sql.NVarChar, russianDescription)
				.input('turkishDescription', sql.NVarChar, turkishDescription)
				.input('arabicDescription', sql.NVarChar, arabicDescription)
				.query(`UPDATE Property 
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
                        deposit=@deposit,
                        commission=@commission,
                        englishDescription=@englishDescription,
                        frenchDescription=@frenchDescription,
                        germanDescription=@germanDescription,
                        russianDescription=@russianDescription,
                        turkishDescription=@turkishDescription,
                        arabicDescription=@arabicDescription
						WHERE Property.id=@id;

					SELECT *
					FROM Property
					WHERE Property.id=@id;`);

			return updatedProperty.recordset[0];
		} catch (error) {
			console.log('Error updating property');
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
					`DELETE FROM Property WHERE Property.id = @propertyId AND Property.companyId=@companyId;`
				);
			return obj;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
