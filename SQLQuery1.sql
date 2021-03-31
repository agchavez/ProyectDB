CREATE DATABASE MovieTheater;
USE MovieTheater;

-- Tabla de lacales en los que se encuentra el cine
CREATE TABLE Establishment(
	id INT IDENTITY PRIMARY KEY,
	name TEXT NOT NULL,
	city TEXT NOT NULL, 
	stateC TEXT NOT NULL,
	direction TEXT NOT NULL,
	email TEXT NOT NULL
);

-- Tabla de numeros de telefonos del establecimiento
CREATE TABLE PhoneLocal(
	id INT IDENTITY PRIMARY KEY,
	local_id INT NOT NULL ,
	phone VARCHAR(20) NOT NULL,
	phone_description TEXT NOT NULL,
	FOREIGN KEY (local_id) REFERENCES Establishment(id)
);




