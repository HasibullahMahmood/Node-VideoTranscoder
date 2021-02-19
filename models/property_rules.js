const sql = require('mssql');

module.exports = class Property_Rules {
	static getProperty_Rules = async (propertyId) => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.input('propertyId', sql.Int, propertyId)
				.query(
					`SELECT * FROM Property_Rules WHERE Property_Rules.propertyId=@propertyId;`
				);
			return result.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static addProperty_Rules = async (newObjects) => {
		try {
			let queryStatement = `INSERT INTO Property_Rules (propertyId, ruleId) VALUES `;

			newObjects.forEach((obj) => {
				queryStatement += `(${obj.propertyId}, ${obj.ruleId}),`;
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

	static deletePRExceptThese = async (ids, propertyId) => {
		try {
			ids = ids.toString();
			let queryStatement = '';
			if (ids) {
				queryStatement = `DELETE FROM Property_Rules 
									WHERE Property_Rules.id NOT IN (${ids}) 
									AND Property_Rules.propertyId=${propertyId};`;
			} else {
				queryStatement = `DELETE FROM Property_Rules 
									WHERE Property_Rules.propertyId=${propertyId};`;
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
