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
			const pool = await sql.connect();
			const insertedUser = await pool
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
			const pool = await sql.connect();
			const users = await pool.request().query(
				`SELECT id, name, surname, email, phoneNumber, companyId 
					FROM Users`
			);
			return users.recordsets;
		} catch (err) {
			console.log(err);
		}
	};

	static findByEmail = async (email) => {
		try {
			const pool = await sql.connect();
			const user = await pool
				.request()
				.input('email', sql.NVarChar, email).query(`SELECT *
						FROM Users 
						WHERE Users.email = @email`);

			return user.recordset[0];
		} catch (err) {
			console.log(err);
		}
	};

	static findById = async (id) => {
		try {
			const pool = await sql.connect();
			const user = await pool.request().input('id', sql.Int, id)
				.query(`SELECT id, name, surname, email, phoneNumber, companyId 
						FROM Users 
						WHERE Users.id = @id`);

			return user.recordset[0];
		} catch (err) {
			console.log(err);
		}
	};

	static getUsersBasedOnCompanyId = async (companyId) => {
		try {
			const pool = await sql.connect();
			const users = await pool
				.request()
				.input('companyId', sql.Int, companyId)
				.query(`SELECT id, name, surname, email, phoneNumber, companyId 
					FROM Users
					WHERE Users.companyId = @companyId`);
			return users.recordset;
		} catch (err) {
			console.log(err);
		}
	};

	static updateUserWithPassword = async (
		id,
		name,
		surname,
		email,
		password,
		phoneNumber
	) => {
		try {
			const pool = await sql.connect();
			const updatedUser = await pool
				.request()
				.input('id', sql.Int, id)
				.input('name', sql.NVarChar, name)
				.input('surname', sql.NVarChar, surname)
				.input('email', sql.NVarChar, email)
				.input('password', sql.NVarChar, password)
				.input('phoneNumber', sql.NVarChar, phoneNumber)
				.query(`UPDATE Users 
					SET name=@name,
						surname=@surname,
						email=@email,
						password=@password,
						phoneNumber=@phoneNumber	
					WHERE Users.id=@id;

					SELECT id, name, surname, email, phoneNumber, companyId 
					FROM Users
					WHERE Users.id=@id;`);
			return updatedUser.recordset[0];
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	static updateUserWithoutPassword = async (
		id,
		name,
		surname,
		email,
		phoneNumber
	) => {
		try {
			const pool = await sql.connect();
			const updatedUser = await pool
				.request()
				.input('id', sql.Int, id)
				.input('name', sql.NVarChar, name)
				.input('surname', sql.NVarChar, surname)
				.input('email', sql.NVarChar, email)
				.input('phoneNumber', sql.NVarChar, phoneNumber)
				.query(`UPDATE Users 
					SET name=@name,
						surname=@surname,
						email=@email,
						phoneNumber=@phoneNumber	
					WHERE Users.id=@id;
					
					SELECT id, name, surname, email, phoneNumber, companyId 
					FROM Users
					WHERE Users.id=@id;`);
			return updatedUser.recordset[0];
		} catch (error) {
			console.log(error);
		}
	};
};
