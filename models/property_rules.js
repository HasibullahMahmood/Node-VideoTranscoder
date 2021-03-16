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
			const pool = await sql.connect();
			const ps = new sql.PreparedStatement(pool);
			ps.input('propertyId', sql.Int);
			ps.input('ruleId', sql.Int);

			await ps.prepare(`INSERT INTO Property_Rules
										(propertyId, ruleId)
									VALUES
									 	(@propertyId, @ruleId);`);

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
