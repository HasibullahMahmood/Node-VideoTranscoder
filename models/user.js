const sql = require('mssql');

module.exports = class User {
	constructor(name, surname, companyId, phoneNumber, email, password) {
		this.name = name;
		this.surname = surname;
		this.companyId = companyId;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.password = password;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedUser = await pool
				.request()
				.input('name', sql.NVarChar, this.name)
				.input('surname', sql.NVarChar, this.surname)
				.input('companyId', sql.Int, this.companyId)
				.input('phoneNumber', sql.NVarChar, this.phoneNumber)
				.input('email', sql.NVarChar, this.email)
				.input('password', sql.NVarChar, this.password)
				.query(`INSERT INTO Users 
                    (name, surname, companyId, phoneNumber, email, password) 
					VALUES(@name, @surname, @companyId, @phoneNumber, @email, @password);
					SELECT id FROM Users WHERE id = SCOPE_IDENTITY();`);
			return insertedUser.recordset[0];
		} catch (err) {
			console.log('Error in saving the user: ');
			console.log(err);
			throw err;
		}
	};

	static fetchAll = async () => {
		try {
			let pool = await sql.connect();
			let users = await pool.request().query(`SELECT * FROM Users`);
			return users.recordsets;
		} catch (err) {
			console.log(err);
		}
	};

	static findByEmail = async (email) => {
		try {
			let pool = await sql.connect();
			let user = await pool
				.request()
				.input('email', sql.NVarChar, email)
				.query(`SELECT * FROM Users WHERE Users.email = @email`);

			return user.recordset[0];
		} catch (err) {
			console.log(err);
		}
	};
};
