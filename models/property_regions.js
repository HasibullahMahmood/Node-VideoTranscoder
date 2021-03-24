const sql = require('mssql');

module.exports = class Property_Regions {
	static getProperty_Regions = async (propertyId) => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.input('propertyId', sql.Int, propertyId)
				.query(
					`SELECT * FROM Property_Regions WHERE Property_Regions.propertyId=@propertyId;`
				);
			return result.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static addProperty_Regions = async (newObjects) => {
		try {
			const pool = await sql.connect();
			const ps = new sql.PreparedStatement(pool);
			ps.input('propertyId', sql.Int);
			ps.input('regionId', sql.Int);

			await ps.prepare(`INSERT INTO Property_Regions
										(propertyId, regionId)
									VALUES
									 	(@propertyId, @regionId);`);

			await newObjects.reduce(async (prev, row) => {
				await prev;
				return ps.execute(row);
			}, Promise.resolve());
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static deletePRExceptThese = async (ids, propertyId) => {
		try {
			ids = ids.toString();
			let queryStatement = '';
			if (ids) {
				queryStatement = `DELETE FROM Property_Regions 
									WHERE Property_Regions.id NOT IN (${ids}) 
									AND Property_Regions.propertyId=${propertyId};`;
			} else {
				queryStatement = `DELETE FROM Property_Regions 
									WHERE Property_Regions.propertyId=${propertyId};`;
			}

			const pool = await sql.connect();
			const result = await pool.request().query(queryStatement);
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
