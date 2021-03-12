const sql = require('mssql');

module.exports = class ResDays {
	static fetchByConditions = async (resId) => {
		try {
			const pool = await sql.connect();
			const resDays = await pool
				.request()
				.input('resId', sql.Int, resId)
				.query(`SELECT * FROM ResDays WHERE ResDays.resId=@resId;`);
			return resDays.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static add = async (newObjects) => {
		try {
			let queryStatement = `INSERT INTO ResDays 
									(resId, agency_id, property_id, date_, guestCount,
									 agencyPrice, agencyDiscount, subtotal, agencyPrice_id, agencyDiscount_id)
									VALUES `;

			newObjects.forEach((obj) => {
				queryStatement += `(${obj.resId}, ${obj.agency_id}, ${obj.property_id}, '${obj.date_}',
									${obj.guestCount}, ${obj.agencyPrice}, ${obj.agencyDiscount}, ${obj.subtotal},
									'${obj.agencyPrice_id}', '${obj.agencyDiscount_id}'),`;
			});
			queryStatement = queryStatement.slice(0, -1);

			const pool = await sql.connect();
			const result = await pool
				.request()
				.query(queryStatement, [newObjects]);
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static delete = async (resId) => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.input('resId', sql.Int, resId)
				.query(`DELETE FROM ResDays WHERE resId=@resId;`);
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
