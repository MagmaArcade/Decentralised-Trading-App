-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS assetsphere;

-- Use the database
USE assetsphere;

-- Create the Users table if it doesn't exist
CREATE TABLE IF NOT EXISTS Users (
    userID INT PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    dob DATE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    walletAddress VARCHAR(255) UNIQUE
);

-- Create the Category table if it doesn't exist
CREATE TABLE IF NOT EXISTS Category (
    categoryName VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255)
);

-- Create the DigitalAssets table if it doesn't exist
CREATE TABLE IF NOT EXISTS DigitalAssets (
    assetID INT PRIMARY KEY,
    UserId INT,
    name VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(15,2),
    categoryName VARCHAR(255),
    FOREIGN KEY (UserId) REFERENCES Users(userID),
    FOREIGN KEY (categoryName) REFERENCES Category(categoryName)
);

-- Create the TransactionHistory table if it doesn't exist
CREATE TABLE IF NOT EXISTS TransactionHistory (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    assetName VARCHAR(255),
    userFrom INT,
    walletFrom VARCHAR(255),
    walletTo VARCHAR(255),
    purchaseTime TIMESTAMP,
    pricePaid DECIMAL(15,2),
    FOREIGN KEY (userFrom) REFERENCES Users(userID)
);

CREATE TABLE IF NOT EXISTS contractinformation (
    contractName VARCHAR(255) NULL DEFAULT NULL,
    address VARCHAR(255) NULL DEFAULT NULL
);

-- Insert data for Category
INSERT INTO Category (categoryName, description)
VALUES
    ('Category A', 'Coin'),
    ('Category B', 'Image');