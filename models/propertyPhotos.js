const sql = require('mssql');

module.exports = class PropertyPhotos {
	constructor(photoRef, propertyId) {
		this.photoRef = photoRef;
		this.propertyId = propertyId;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedPhoto = await pool
				.request()
				.input('photoRef', sql.NVarChar, this.photoRef)
				.input('propertyId', sql.Int, this.propertyId)
				.query(
					`INSERT INTO PropertyPhotos (photoRef, propertyId) VALUES(@photoRef, @propertyId); 
					 SELECT * FROM PropertyPhotos WHERE id = SCOPE_IDENTITY();`
				);
			return insertedPhoto.recordset[0];
		} catch (error) {
			console.log('Error in saving the photo: ');
			console.log(error);
			throw error;
		}
	};

	static delete = async (photoId) => {
		try {
			let pool = await sql.connect();
			let result = await pool
				.request()
				.input('photoId', sql.Int, photoId)
				.query(
					`DELETE FROM PropertyPhotos WHERE PropertyPhotos.id=@photoId;`
				);
			return result;
		} catch (error) {
			console.log('Error in deleting a photo: ');
			console.log(error);
			throw error;
		}
	};

	static fetchAll = async (propertyId) => {
		try {
			let pool = await sql.connect();
			let photos = await pool
				.request()
				.input('propertyId', sql.Int, propertyId)
				.query(
					`SELECT * FROM PropertyPhotos WHERE PropertyPhotos.propertyId=@propertyId;`
				);
			return photos.recordset;
		} catch (error) {
			console.log('Error in fetching PropertyPhotos: ');
			console.log(error);
			throw error;
		}
	};

	static findById = async (id) => {
		try {
			let pool = await sql.connect();
			let photo = await pool
				.request()
				.input('id', sql.Int, id)
				.query(
					`SELECT * FROM PropertyPhotos WHERE PropertyPhotos.id=@id;`
				);
			return photo.recordset[0];
		} catch (error) {
			console.log('Error in fetching a photo: ');
			console.log(error);
			throw error;
		}
	};
};
