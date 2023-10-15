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
    description TEXT
);

-- Create the DigitalAssets table if it doesn't exist
CREATE TABLE IF NOT EXISTS DigitalAssets (
    assetID INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(15,2),
    categoryName VARCHAR(255),
    FOREIGN KEY (UserId) REFERENCES Users(userID),
    FOREIGN KEY (categoryName) REFERENCES Category(categoryName)
);

-- Create the TransactionHistory table if it doesn't exist
CREATE TABLE IF NOT EXISTS TransactionHistory (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    assetID INT,
    userID INT,
    purchaseTime TIMESTAMP,
    pricePaid DECIMAL(15,2),
    FOREIGN KEY (assetID) REFERENCES DigitalAssets(assetID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);



-- Insert data for Category
INSERT INTO Category (categoryName, description)
VALUES
    ('Category A', 'fun a'),
    ('Category B', 'fun b');

-- Insert data for DigitalAssets
INSERT INTO DigitalAssets (UserId, name, description, price, categoryName)
VALUES
    ("0", 'Asset 1', 'Description for Asset 1', 100.00, 'Category A'),
    ("0", 'Asset 2', 'Description for Asset 2', 150.00, 'Category B'),
    ("0", 'Asset 3', 'Description for Asset 3', 75.00, 'Category A');
