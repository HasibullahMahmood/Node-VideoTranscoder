const sql = require('mssql');

module.exports = class Property_Places {
	static getProperty_Places = async (propertyId) => {
		try {
			const pool = await sql.connect();
			const propertyPlaces = await pool
				.request()
				.input('propertyId', sql.Int, propertyId)
				.query(
					`SELECT * FROM Property_Places WHERE Property_Places.propertyId=@propertyId;`
				);
			return propertyPlaces.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static addProperty_Places = async (newObjects) => {
		try {
			const pool = await sql.connect();
			const ps = new sql.PreparedStatement(pool);
			ps.input('propertyId', sql.Int);
			ps.input('placeId', sql.Int);
			ps.input('distance', sql.Int);

			await ps.prepare(`INSERT INTO Property_Places
										(propertyId, placeId, distance)
									VALUES
									 	(@propertyId, @placeId, @distance);`);

			await newObjects.reduce(async (prev, row) => {
				await prev;
				return ps.execute(row);
			}, Promise.resolve());
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static updateProperty_Places = async (objects) => {
		try {
			let queryStatement = '';
			objects.forEach((obj) => {
				queryStatement += `UPDATE Property_Places SET distance=${obj.distance} WHERE id=${obj.id};`;
			});
			const pool = await sql.connect();
			const result = await pool.request().query(queryStatement);
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
