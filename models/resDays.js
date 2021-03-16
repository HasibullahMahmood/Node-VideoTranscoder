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
			const pool = await sql.connect();
			const ps = new sql.PreparedStatement(pool);
			ps.input('resId', sql.Int);
			ps.input('agency_id', sql.Int);
			ps.input('property_id', sql.Int);
			ps.input('date_', sql.DateTime);
			ps.input('guestCount', sql.Int);
			ps.input('agencyPrice', sql.Float);
			ps.input('agencyDiscount', sql.Float);
			ps.input('subtotal', sql.Float);
			ps.input('agencyPrice_id', sql.Int);
			ps.input('agencyDiscount_id', sql.Int);

			await ps.prepare(`INSERT INTO ResDays 
			 						(resId, agency_id, property_id, date_, guestCount, agencyPrice,
										agencyDiscount, subtotal, agencyPrice_id, agencyDiscount_id)
			 						VALUES
									 (@resId, @agency_id, @property_id, @date_, @guestCount, @agencyPrice,
										@agencyDiscount, @subtotal, @agencyPrice_id, @agencyDiscount_id)`);

			await newObjects.reduce(async (prev, row) => {
				await prev;
				return ps.execute(row);
			}, Promise.resolve());
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
