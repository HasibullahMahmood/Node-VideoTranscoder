const sql = require('mssql');

module.exports = class Property_NotIncludedInPriceFeatures {
	static getProperty_NotIncludedInPriceFeatures = async (propertyId) => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.input('propertyId', sql.Int, propertyId)
				.query(
					`SELECT * FROM Property_NotIncludedInPriceFeatures WHERE propertyId=@propertyId;`
				);
			return result.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static addProperty_NotIncludedInPriceFeatures = async (newObjects) => {
		try {
			const pool = await sql.connect();
			const ps = new sql.PreparedStatement(pool);
			ps.input('propertyId', sql.Int);
			ps.input('notIncludedInPriceFeatureId', sql.Int);

			await ps.prepare(`INSERT INTO Property_NotIncludedInPriceFeatures
										(propertyId, notIncludedInPriceFeatureId)
									VALUES
									 	(@propertyId, @notIncludedInPriceFeatureId);`);

			await newObjects.reduce(async (prev, row) => {
				await prev;
				return ps.execute(row);
			}, Promise.resolve());
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static deletePFExceptThese = async (ids, propertyId) => {
		try {
			ids = ids.toString();
			let queryStatement = '';
			if (ids) {
				queryStatement = `DELETE FROM Property_NotIncludedInPriceFeatures 
									WHERE Property_NotIncludedInPriceFeatures.id NOT IN (${ids}) 
									AND Property_NotIncludedInPriceFeatures.propertyId=${propertyId};`;
			} else {
				queryStatement = `DELETE FROM Property_NotIncludedInPriceFeatures 
									WHERE Property_NotIncludedInPriceFeatures.propertyId=${propertyId};`;
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
