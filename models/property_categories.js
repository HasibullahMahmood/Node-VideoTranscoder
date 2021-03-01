const sql = require('mssql');

module.exports = class Property_Categories {
	static getProperty_Categories = async (propertyId) => {
		try {
			const pool = await sql.connect();
			const propertyCategories = await pool
				.request()
				.input('propertyId', sql.Int, propertyId)
				.query(
					`SELECT * FROM Property_Categories WHERE Property_Categories.propertyId=@propertyId;`
				);
			return propertyCategories.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static addProperty_Categories = async (newObjects) => {
		try {
			let queryStatement = `INSERT INTO Property_Categories (propertyId, categoryId) VALUES `;

			newObjects.forEach((obj) => {
				queryStatement += `(${obj.propertyId}, ${obj.categoryId}),`;
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

	static deletePCExceptThese = async (ids, propertyId) => {
		try {
			ids = ids.toString();
			let queryStatement = '';
			if (ids) {
				queryStatement = `DELETE FROM Property_Categories 
									WHERE Property_Categories.id NOT IN (${ids}) 
									AND Property_Categories.propertyId=${propertyId};`;
			} else {
				queryStatement = `DELETE FROM Property_Categories 
									WHERE Property_Categories.propertyId=${propertyId};`;
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
