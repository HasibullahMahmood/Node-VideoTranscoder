IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'vihobook')
  BEGIN
    CREATE DATABASE vihobook
  END;
  GO
       USE vihobook
  GO


  IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Companies' and xtype='U')
	BEGIN
			CREATE TABLE Companies
			(
				id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
				name NVARCHAR(30),
				title NVARCHAR(150),
				email NVARCHAR(30),
				telephoneNumber NVARCHAR(30),
				taxAdministration NVARCHAR(30),
				taxNumber NVARCHAR(30),
				countryId INT,
				provinceId INT, 
				districtId INT,
				address1 NVARCHAR(50),
				address2 NVARCHAR(50),
				logoRef NVARCHAR(50),
				state BIT,
				FOREIGN KEY (countryId) REFERENCES Countries(id),
				FOREIGN KEY (provinceId) REFERENCES Provinces(id),
				FOREIGN KEY (districtId) REFERENCES Districts(id)

			);
	END;
	Go


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' and xtype='U')
	BEGIN
			CREATE TABLE Users
			(
				id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
				name NVARCHAR(30),
				surname NVARCHAR(30),	
				email NVARCHAR(30) UNIQUE NOT NULL,
				password NVARCHAR(100),
				phoneNumber NVARCHAR(30),
				status BIT NOT NULL,
				isSuperUser BIT NOT NULL,
				companyId INT NOT NULL,
				FOREIGN KEY (companyId) REFERENCES Companies(id)
			);
	END;
	Go


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PropertyTypes' and xtype='U')
	BEGIN
			CREATE TABLE PropertyTypes
			(
				id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
				name NVARCHAR(50),
			);
	END;
	Go


DELETE FROM PropertyTypes;
INSERT INTO PropertyTypes(name) 
			VALUES ('Apartment'),
					('Villa'),
					('Hotel'),
					('Hostel');

SELECT * FROM PropertyTypes;


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Property' and xtype='U')
BEGIN
		CREATE TABLE Property
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
			shortName NVARCHAR(30),
			propertyTypeId INT NOT NULL,
			capacity INT,
			bedroomNumber INT,
			bedNumber INT,
			bathroomNumber INT,
			hasSwimmingPool BIT,
			status BIT,
			countryId INT,
			provinceId INT,
			districtId INT,
			address NVARCHAR(100),
			deposit INT,
			commission INT,
			englishDescription NVARCHAR(MAX),
			frenchDescription NVARCHAR(MAX),
			germanDescription NVARCHAR(MAX),
			russianDescription NVARCHAR(MAX),
			turkishDescription NVARCHAR(MAX),
			arabicDescription NVARCHAR(MAX),
			companyId INT NOT NULL,
			FOREIGN KEY (companyId) REFERENCES Companies(id),
			FOREIGN KEY (countryId) REFERENCES Countries(id),
			FOREIGN KEY (provinceId) REFERENCES Provinces(id),
			FOREIGN KEY (districtId) REFERENCES Districts(id),
			FOREIGN KEY (propertyTypeId) REFERENCES PropertyTypes(id)
		);
END;
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Features' and xtype='U')
BEGIN
		CREATE TABLE Features
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
			icon NVARCHAR(50),
		);
END;
Go

INSERT INTO Features  (name) 
				VALUES ('Wifi/Internet'),
					   ('Garden'),
					   ('Barbecue'),
					   ('Toast machine'),
					   ('Kettle'),
					   ('Hair dryer'),
					   ('Balcony'),
					   ('Sea view'),
					   ('Dishwasher'),
					   ('Jacuzzi'),
					   ('Car park');


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Property_Features' and xtype='U')
BEGIN
		CREATE TABLE Property_Features
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			propertyId INT,
			featureId INT,
			FOREIGN KEY (propertyId) REFERENCES Property(id),
			FOREIGN KEY (featureId) REFERENCES Features(id)
		);
END;
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Rules' and xtype='U')
BEGIN
		CREATE TABLE Rules
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
			icon NVARCHAR(50),
		);
END;
Go

INSERT INTO Rules (name) 
				VALUES ('Children allowed'),
					   ('Smoking not allowed'),
					   ('Pets not allowed'),
					   ('Parties/events not allowed');
	


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Property_Rules' and xtype='U')
BEGIN
		CREATE TABLE Property_Rules
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			propertyId INT,
			ruleId INT,
			FOREIGN KEY (propertyId) REFERENCES Property(id),
			FOREIGN KEY (ruleId) REFERENCES Rules(id)
		);
END;
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='IncludedInPriceFeatures' and xtype='U')
BEGIN
		CREATE TABLE IncludedInPriceFeatures
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
			icon NVARCHAR(50),
		);
END;
Go

INSERT INTO IncludedInPriceFeatures (name) 
				VALUES ('Electricity'),
					   ('Water'),
					   ('Internet'),
					   ('Gas'),
					   ('Pool and Garden Care');
					  

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Property_IncludedInPriceFeatures' and xtype='U')
BEGIN
		CREATE TABLE Property_IncludedInPriceFeatures
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			propertyId INT,
			includedInPriceFeatureId INT,
			FOREIGN KEY (propertyId) REFERENCES Property(id),
			FOREIGN KEY (includedInPriceFeatureId) REFERENCES IncludedInPriceFeatures(id)
		);
END;
Go


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='NotIncludedInPriceFeatures' and xtype='U')
BEGIN
		CREATE TABLE NotIncludedInPriceFeatures
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
			icon NVARCHAR(50),
		);
END;
Go

INSERT INTO NotIncludedInPriceFeatures (name) 
				VALUES ('Transportation Service'),
					   ('Food Service'),
					   ('Highchairs'),
					   ('Extra bed'),
					   ('Extra Cleaning');

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Property_NotIncludedInPriceFeatures' and xtype='U')
BEGIN
		CREATE TABLE Property_NotIncludedInPriceFeatures
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			propertyId INT,
			notIncludedInPriceFeatureId INT,
			FOREIGN KEY (propertyId) REFERENCES Property(id),
			FOREIGN KEY (notIncludedInPriceFeatureId) REFERENCES NotIncludedInPriceFeatures(id)
		);
END;
Go


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PropertyPhotos' and xtype='U')
BEGIN
		CREATE TABLE PropertyPhotos
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			photoRef NVARCHAR(200),
			propertyId INT,
			FOREIGN KEY (propertyId) REFERENCES Property(id)
		);
END;
Go


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Categories' and xtype='U')
BEGIN
		CREATE TABLE Categories
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
		);
END;
Go


INSERT INTO Categories (name) 
				VALUES ('Honeymoon Villas'),
						('Luxury Rental Villas'),
					    ('Sheltered Rental Villas'),
						 ('Conservative Rental Villas'),
						 ('With Pool Rental Villas'),
						 ('Sea View Rental Villas'),
					   ('In Nature Rental Villas'),
					   ('Pool Heated Rental Villas'),
					   ('For Large Family Groups Rental Villas'),
					   ('Affordable Rental Villas');
	


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Property_Categories' and xtype='U')
BEGIN
		CREATE TABLE Property_Categories
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			propertyId INT,
			categoryId INT,
			FOREIGN KEY (propertyId) REFERENCES Property(id),
			FOREIGN KEY (categoryId) REFERENCES Categories(id)
		);
END;
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Regions' and xtype='U')
BEGIN
		CREATE TABLE Regions
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
		);
END;
Go


INSERT INTO Regions (name) 
				VALUES ('Marmaris Rental Villa'),
					   ('Fethiye Rental Villa'),
					   ('Gocek Rental Villa'),
					   ('Dalyan Rental Villa'),
					   ('Bodrum Rental Villa'),
					   ('Kaş Rental Villa'),
					   ('Kalkan Rental Villa');
	


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Property_Regions' and xtype='U')
BEGIN
		CREATE TABLE Property_Regions
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			propertyId INT,
			regionId INT,
			FOREIGN KEY (propertyId) REFERENCES Property(id),
			FOREIGN KEY (regionId) REFERENCES Regions(id)
		);
END;
Go


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Places' and xtype='U')
BEGIN
		CREATE TABLE Places
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
		);
END;
Go

INSERT INTO Places (name) 
				VALUES ('Airport'),
					   ('City center'),
					   ('Beach'),
					   ('Bus station'),
					   ('Market'),
					   ('Restaurant');
	


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Property_Places' and xtype='U')
BEGIN
		CREATE TABLE Property_Places
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			propertyId INT,
			placeId INT,
			distance INT,
			FOREIGN KEY (propertyId) REFERENCES Property(id),
			FOREIGN KEY (placeId) REFERENCES Places(id)
		);
END;
Go


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Currency' and xtype='U')
BEGIN
		CREATE TABLE Currency
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(10)
		);
END;
Go

INSERT INTO Currency (name) 
				VALUES ('USD'),
					   ('EUR'),
					   ('TL'),
					   ('GBP');
					


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Agency' and xtype='U')
BEGIN
		CREATE TABLE Agency
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50)
		);
END;
Go

INSERT INTO Agency (name) 
				VALUES ('VILLACINIZ'),
					   ('AIRBNB'),
					   ('VIHOBOOK'),
					   ('BOOKING.COM');

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AgencyPrice' and xtype='U')
BEGIN
		CREATE TABLE AgencyPrice
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			contractName NVARCHAR(50),
			agency_id INT,
			property_id INT,
			startingDate DATE,
			endDate DATE,
			price VARCHAR(MAX),
			currency_id INT,
			createdAt DATETIME NOT NULL,
			updatedAt DATETIME,
			companies_id INT,

			FOREIGN KEY (agency_id) REFERENCES Agency(id),
			FOREIGN KEY (property_id) REFERENCES Property(id),
			FOREIGN KEY (currency_id) REFERENCES Currency(id),
			FOREIGN KEY (companies_id) REFERENCES Companies(id),

		);
END;
Go


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AgencyDiscount' and xtype='U')
BEGIN
		CREATE TABLE AgencyDiscount
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			discountName NVARCHAR(50),
			agency_id INT,
			property_id INT,
			startingDate DATE,
			endDate DATE,
			discount VARCHAR(MAX),
			createdAt DATETIME NOT NULL,
			updatedAt DATETIME,
			companies_id INT,

			FOREIGN KEY (agency_id) REFERENCES Agency(id),
			FOREIGN KEY (property_id) REFERENCES Property(id),
			FOREIGN KEY (companies_id) REFERENCES Companies(id),
		);
END;
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PaymentMethods' and xtype='U')
BEGIN
		CREATE TABLE PaymentMethods
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(50),
		);
END;
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ResStatuses' and xtype='U')
BEGIN
		CREATE TABLE ResStatuses
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			name NVARCHAR(20),
		);
END;
Go



INSERT INTO ResStatuses (name)
				VALUES ('Pending Approval'),
					   ('Approved'),
					   ('In-House'),
					   ('Checked-out'),
					   ('Canceled');


IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Reservation' and xtype='U')
BEGIN
		CREATE TABLE Reservation
		(
		   resId INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
		   resDate DATETIME NULL,
		   resStatus_id INT NULL,
		   agency_id INT NULL,
		   property_id INT NULL,
		   resNo NVARCHAR(50) NULL,
		   checkIn DATETIME NULL,
		   checkOut DATETIME NULL,
		   name NVARCHAR(50) NULL,
		   surname NVARCHAR(50) NULL,
		   email NVARCHAR(50) NULL,
		   phoneNo NVARCHAR(20) NULL,
		   guestCount INT NULL,
		   note NVARCHAR(255) NULL,
		   paymentMethod_id INT NULL,
		   priceType BIT,
		   totalPrice FLOAT NULL,
		   deposit FLOAT NULL,
		   currency_id INT NULL,
		   company_id INT NULL,
		   createdBy INT NOT NULL,
		   createdAt DATETIME NOT NULL,
		   updatedBy INT NULL,
		   updatedAt DATETIME,

		   FOREIGN KEY (agency_id) REFERENCES Agency(id),
		   FOREIGN KEY (property_id) REFERENCES Property(id),
		   FOREIGN KEY (paymentMethod_id) REFERENCES PaymentMethods(id),
		   FOREIGN KEY (currency_id) REFERENCES Currency(id),
		   FOREIGN KEY (company_id) REFERENCES Companies(id),
		   FOREIGN KEY (resStatus_id) REFERENCES ResStatuses(id),
		   FOREIGN KEY (createdBy) REFERENCES Users(id),
		);
END;
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ResDays' and xtype='U')
BEGIN
		CREATE TABLE ResDays(
			   id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			   resId INT NULL,
			   agency_id INT NULL,
			   property_id INT NULL,
			   date_ DATETIME NULL,
			   guestCount INT NULL,
			   agencyPrice FLOAT NULL,
			   agencyDiscount FLOAT NULL,
			   subtotal FLOAT NULL,
			   agencyPrice_id INT NULL,
			   agencyDiscount_id INT NULL,

			   FOREIGN KEY (resId) REFERENCES Reservation(resId),
			   FOREIGN KEY (agency_id) REFERENCES Agency(id),
			   FOREIGN KEY (property_id) REFERENCES Property(id)
			);
END;
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='HomePage_Property' and xtype='U')
BEGIN
		CREATE TABLE HomePage_Property
		(
			id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
			property_id INT NOT NULL,
			FOREIGN KEY (property_id) REFERENCES Property(id),
		);
END;
Go

