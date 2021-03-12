const sql = require('mssql');
const { getCurrentDateTime } = require('../util/utilityFunctions');

module.exports = class Reservation {
	constructor(
		resDate,
		statusCode,
		agency_id,
		property_id,
		resNo,
		checkIn,
		checkOut,
		name,
		surname,
		email,
		phoneNo,
		guestCount,
		note,
		paymentMethod_id,
		priceType,
		totalPrice,
		deposit,
		currency_id,
		company_id
	) {
		this.resDate = resDate;
		this.statusCode = statusCode;
		this.agency_id = agency_id;
		this.property_id = property_id;
		this.resNo = resNo;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.phoneNo = phoneNo;
		this.guestCount = guestCount;
		this.note = note;
		this.paymentMethod_id = paymentMethod_id;
		this.priceType = priceType;
		this.totalPrice = totalPrice;
		this.deposit = deposit;
		this.currency_id = currency_id;
		this.company_id = company_id;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedOne = await pool
				.request()
				.input('resDate', sql.Date, this.resDate)
				.input('statusCode', sql.NVarChar, this.statusCode)
				.input('agency_id', sql.Int, this.agency_id)
				.input('property_id', sql.Int, this.property_id)
				.input('resNo', sql.NVarChar, this.resNo)
				.input('checkIn', sql.DateTime, this.checkIn)
				.input('checkOut', sql.DateTime, this.checkOut)
				.input('name', sql.NVarChar, this.name)
				.input('surname', sql.NVarChar, this.surname)
				.input('email', sql.NVarChar, this.email)
				.input('phoneNo', sql.NVarChar, this.phoneNo)
				.input('guestCount', sql.Int, this.guestCount)
				.input('note', sql.NVarChar, this.note)
				.input('paymentMethod_id', sql.Int, this.paymentMethod_id)
				.input('priceType', sql.Bit, this.priceType)
				.input('totalPrice', sql.Float, this.totalPrice)
				.input('deposit', sql.Float, this.deposit)
				.input('currency_id', sql.Int, this.currency_id)
				.input('company_id', sql.Int, this.company_id)
				.input('createdAt', sql.DateTime, getCurrentDateTime())

				.query(
					`INSERT INTO Reservation (resDate, statusCode, agency_id, property_id, resNo,
						checkIn, checkOut, name, surname, email, phoneNo, guestCount, note, paymentMethod_id,
						priceType, totalPrice, deposit, currency_id, company_id, createdAt)
					VALUES(@resDate, @statusCode, @agency_id, @property_id, @resNo,
						@checkIn, @checkOut, @name, @surname, @email, @phoneNo, @guestCount, @note, @paymentMethod_id,
						@priceType, @totalPrice ,@deposit, @currency_id, @company_id, @createdAt); 
					 SELECT * FROM Reservation WHERE Reservation.resId = SCOPE_IDENTITY();`
				);

			return insertedOne.recordset[0];
		} catch (err) {
			console.log('Error in saving the Reservation: ');
			console.log(err);
			throw err;
		}
	};

	static update = async (
		resId,
		resDate,
		statusCode,
		agency_id,
		property_id,
		resNo,
		checkIn,
		checkOut,
		name,
		surname,
		email,
		phoneNo,
		guestCount,
		note,
		paymentMethod_id,
		priceType,
		totalPrice,
		deposit,
		currency_id,
		company_id
	) => {
		try {
			let pool = await sql.connect();
			let updatedOne = await pool
				.request()
				.input('resId', sql.Int, resId)
				.input('resDate', sql.Date, resDate)
				.input('statusCode', sql.NVarChar, statusCode)
				.input('agency_id', sql.Int, agency_id)
				.input('property_id', sql.Int, property_id)
				.input('resNo', sql.NVarChar, resNo)
				.input('checkIn', sql.DateTime, checkIn)
				.input('checkOut', sql.DateTime, checkOut)
				.input('name', sql.NVarChar, name)
				.input('surname', sql.NVarChar, surname)
				.input('email', sql.NVarChar, email)
				.input('phoneNo', sql.NVarChar, phoneNo)
				.input('guestCount', sql.Int, guestCount)
				.input('note', sql.NVarChar, note)
				.input('paymentMethod_id', sql.Int, paymentMethod_id)
				.input('priceType', sql.Bit, priceType)
				.input('totalPrice', sql.Float, totalPrice)
				.input('deposit', sql.Float, deposit)
				.input('currency_id', sql.Int, currency_id)
				.input('company_id', sql.Int, company_id)
				.input('updatedAt', sql.DateTime, getCurrentDateTime())

				.query(
					`UPDATE Reservation
					 	SET 
							resDate = @resDate,
							statusCode = @statusCode,
							agency_id = @agency_id,
							property_id = @property_id,
							resNo = @resNo,
							checkIn = @checkIn,
							checkOut = @checkOut,
							name = @name,
							surname = @surname,
							email = @email,
							phoneNo = @phoneNo,
							guestCount = @guestCount,
							note = @note,
							paymentMethod_id = @paymentMethod_id,
							priceType = @priceType,
							totalPrice = @totalPrice,
							deposit = @deposit,
							currency_id = @currency_id,
							updatedAt = @updatedAt
							
						WHERE Reservation.resId=@resId AND Reservation.company_id=@company_id;
					SELECT * FROM Reservation WHERE resId = @resId;
					`
				);
			return updatedOne.recordset[0];
		} catch (err) {
			console.log('Error in updating the Reservation: ');
			console.log(err);
			throw err;
		}
	};

	static fetchAll = async (company_id) => {
		try {
			let pool = await sql.connect();
			let result = await pool
				.request()
				.input('company_id', sql.Int, company_id)
				.query(`SELECT Reservation.*, Agency.name as agencyName, Property.name as propertyName,
				               PaymentMethods.name as paymentMethodName, Currency.name as currencyName,
							   ResStatuses.description as statusDescription
							FROM Reservation
							LEFT JOIN Agency ON Reservation.agency_id = Agency.id
							LEFT JOIN Property ON Reservation.property_id = Property.id
							LEFT JOIN PaymentMethods ON Reservation.paymentMethod_id = PaymentMethods.id
							LEFT JOIN Currency ON Reservation.currency_id = Currency.id
							LEFT JOIN ResStatuses ON Reservation.statusCode = ResStatuses.code
							WHERE Reservation.company_id=@company_id;`);

			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	static delete = async (resId, company_id) => {
		try {
			let pool = await sql.connect();
			let result = await pool
				.request()
				.input('resId', sql.Int, resId)
				.input('company_id', sql.Int, company_id)
				.query(
					`DELETE FROM Reservation 
						WHERE Reservation.resId = @resId
						AND
						Reservation.company_id=@company_id;`
				);

			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
