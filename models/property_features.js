const sql = require('mssql');

module.exports = class Property_Features {
	static getProperty_Features = async (propertyId) => {
		try {
			const pool = await sql.connect();
			const propertyFeatures = await pool
				.request()
				.input('propertyId', sql.Int, propertyId)
				.query(
					`SELECT * FROM Property_Features WHERE Property_Features.propertyId=@propertyId;`
				);
			return propertyFeatures.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static addProperty_Features = async (newObjects) => {
		try {
			const pool = await sql.connect();
			const ps = new sql.PreparedStatement(pool);
			ps.input('propertyId', sql.Int);
			ps.input('featureId', sql.Int);

			await ps.prepare(`INSERT INTO Property_Features
										(propertyId, featureId)
									VALUES
									 	(@propertyId, @featureId);`);

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
				queryStatement = `DELETE FROM Property_Features 
									WHERE Property_Features.id NOT IN (${ids}) 
									AND Property_Features.propertyId=${propertyId};`;
			} else {
				queryStatement = `DELETE FROM Property_Features 
									WHERE Property_Features.propertyId=${propertyId};`;
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
