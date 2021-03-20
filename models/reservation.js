const sql = require('mssql');
const { getCurrentDateTime } = require('../util/utilityFunctions');

module.exports = class Reservation {
	constructor(
		resDate,
		resStatus_id,
		agency_id,
		property_id,
		resNo = '',
		checkIn,
		checkOut,
		name,
		surname,
		email = '',
		phoneNo = '',
		guestCount,
		note = '',
		paymentMethod_id,
		priceType,
		totalPrice,
		deposit = 0,
		currency_id,
		company_id,
		createdBy
	) {
		this.resDate = resDate;
		this.resStatus_id = resStatus_id;
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
		this.createdBy = createdBy;
	}

	save = async () => {
		try {
			let pool = await sql.connect();
			let insertedOne = await pool
				.request()
				.input('resDate', sql.Date, this.resDate)
				.input('resStatus_id', sql.Int, this.resStatus_id)
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
				.input('createdBy', sql.Int, this.createdBy)
				.input('createdAt', sql.DateTime, getCurrentDateTime())

				.query(
					`INSERT INTO Reservation (resDate, resStatus_id, agency_id, property_id, resNo,
						checkIn, checkOut, name, surname, email, phoneNo, guestCount, note, paymentMethod_id,
						priceType, totalPrice, deposit, currency_id, company_id, createdBy, createdAt)
					VALUES(@resDate, @resStatus_id, @agency_id, @property_id, @resNo,
						@checkIn, @checkOut, @name, @surname, @email, @phoneNo, @guestCount, @note, @paymentMethod_id,
						@priceType, @totalPrice ,@deposit, @currency_id, @company_id, @createdBy, @createdAt); 
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
		resStatus_id,
		agency_id,
		property_id,
		resNo = '',
		checkIn,
		checkOut,
		name,
		surname,
		email = '',
		phoneNo = '',
		guestCount,
		note = '',
		paymentMethod_id,
		priceType,
		totalPrice,
		deposit = 0,
		currency_id,
		company_id,
		updatedBy
	) => {
		try {
			let pool = await sql.connect();
			let updatedOne = await pool
				.request()
				.input('resId', sql.Int, resId)
				.input('resDate', sql.Date, resDate)
				.input('resStatus_id', sql.Int, resStatus_id)
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
				.input('updatedBy', sql.Int, updatedBy)
				.input('updatedAt', sql.DateTime, getCurrentDateTime())

				.query(
					`UPDATE Reservation
					 	SET 
							resDate = @resDate,
							resStatus_id = @resStatus_id,
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
							updatedBy = @updatedBy,
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
							   ResStatuses.name as resStatusName, Creator.name as createdBy_name,
							   Updater.name as updatedBy_name
							FROM Reservation
							LEFT JOIN Agency ON Reservation.agency_id = Agency.id
							LEFT JOIN Property ON Reservation.property_id = Property.id
							LEFT JOIN PaymentMethods ON Reservation.paymentMethod_id = PaymentMethods.id
							LEFT JOIN Currency ON Reservation.currency_id = Currency.id
							LEFT JOIN ResStatuses ON Reservation.resStatus_id = ResStatuses.id
							LEFT JOIN Users AS Creator ON Reservation.createdBy = Creator.id
							LEFT JOIN Users AS Updater ON Reservation.updatedBy = Updater.id
							WHERE Reservation.company_id=@company_id;`);

			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	static fetchByDate = async (startDate, endDate, company_id) => {
		try {
			let pool = await sql.connect();
			let result = await pool
				.request()
				.input('startDate', sql.Date, startDate)
				.input('endDate', sql.Date, endDate)
				.input('company_id', sql.Int, company_id)
				.query(`SELECT Reservation.*, Property.name as propertyName
							FROM Reservation
							LEFT JOIN Property ON Reservation.property_id = Property.id
							WHERE Reservation.company_id=@company_id AND
									Reservation.resStatus_id != 5 AND
									(
										(@startDate >= checkIn AND @endDate <= checkOut) OR
										(@startDate <= checkIn AND @endDate >= checkOut) OR
										(@startDate <= checkIn AND @endDate >= checkIn) OR
										(@startDate <= checkOut AND @endDate >= checkOut)
									);`);

			return result.recordset;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	static fetchByResStatus = async (resStatus_id, company_id) => {
		try {
			let pool = await sql.connect();
			let result = await pool
				.request()
				.input('resStatus_id', sql.Int, resStatus_id)
				.input('company_id', sql.Int, company_id)
				.query(`SELECT Reservation.*, Agency.name as agencyName, Property.name as propertyName,
				               PaymentMethods.name as paymentMethodName, Currency.name as currencyName,
							   ResStatuses.name as resStatusName, Creator.name as createdBy_name,
							   Updater.name as updatedBy_name
							FROM Reservation
							LEFT JOIN Agency ON Reservation.agency_id = Agency.id
							LEFT JOIN Property ON Reservation.property_id = Property.id
							LEFT JOIN PaymentMethods ON Reservation.paymentMethod_id = PaymentMethods.id
							LEFT JOIN Currency ON Reservation.currency_id = Currency.id
							LEFT JOIN ResStatuses ON Reservation.resStatus_id = ResStatuses.id
							LEFT JOIN Users AS Creator ON Reservation.createdBy = Creator.id
							LEFT JOIN Users AS Updater ON Reservation.updatedBy = Updater.id
							WHERE
								Reservation.resStatus_id=@resStatus_id AND
								Reservation.company_id=@company_id;`);

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
