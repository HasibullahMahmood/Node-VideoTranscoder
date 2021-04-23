const sql = require('mssql');

module.exports = class HomePage_Property {
	static fetchAll = async () => {
		try {
			const pool = await sql.connect();
			const result = await pool
				.request()
				.query(`
                SELECT		p.id, p.shortName, p.capacity, p.bedroomNumber, p.bedNumber, p.bathroomNumber, pr.name AS provinceName, d.name AS districtName, 
                
                (SELECT		TOP 1		c.name
                            FROM		Property_Categories AS pc
                            LEFT JOIN	Categories AS c ON pc.categoryId = c.id
                            WHERE		pc.propertyId = hp.property_id
                ) AS categoryName,

                (SELECT		TOP 1		pp.photoRef
                            FROM		PropertyPhotos AS pp
                            WHERE		pp.propertyId = hp.property_id
                ) AS photoRef
                
                FROM		HomePage_Property AS hp
                LEFT JOIN	Property AS p ON p.id = hp.property_id
                LEFT JOIN	Provinces AS pr ON pr.id = p.provinceId
                LEFT JOIN	Districts AS d ON d.id = p.districtId;`);
			return result.recordset;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
