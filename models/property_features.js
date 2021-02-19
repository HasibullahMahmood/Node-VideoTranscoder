const sql = require('mssql');

module.exports = class Property_Features {
	static getPropertyFeatures = async (propertyId) => {
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

	static addPropertyFeatures = async (newObjects) => {
		try {
			let queryStatement = `INSERT INTO Property_Features (propertyId, featureId) VALUES `;

			newObjects.forEach((obj) => {
				queryStatement += `(${obj.propertyId}, ${obj.featureId}),`;
			});
			queryStatement = queryStatement.slice(0, -1);

			const pool = await sql.connect();
			const result = await pool.request().query(queryStatement);
			return result;
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
