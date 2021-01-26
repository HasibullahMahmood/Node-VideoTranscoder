const sql = require('mssql');

module.exports = class User {
	constructor(name, surname, companyName, phoneNumber, email, password) {
		this.name = name;
		this.surname = surname;
		this.companyName = companyName;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.password = password;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedUser = await pool
				.request()
				.input('Name', sql.NVarChar, this.name)
				.input('Surname', sql.NVarChar, this.surname)
				.input('CompanyName', sql.NVarChar, this.companyName)
				.input('PhoneNumber', sql.BigInt, this.phoneNumber)
				.input('Email', sql.NVarChar, this.email)
				.input('Password', sql.NVarChar, this.password)
				.query(`INSERT INTO Users 
                    (Name, Surname, CompanyName, PhoneNumber, Email, Password) 
              VALUES(@Name, @Surname, @CompanyName, @PhoneNumber, @Email, @Password)`);
			return insertedUser.recordsets;
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
				.input('Email', sql.NVarChar, email)
				.query(`SELECT * FROM Users WHERE Users.Email = @Email`);

			return user.recordset[0];
		} catch (err) {
			console.log(err);
		}
	};
};
