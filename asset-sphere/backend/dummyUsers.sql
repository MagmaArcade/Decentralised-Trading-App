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
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(15,2),
    categoryName VARCHAR(255),
    FOREIGN KEY (categoryName) REFERENCES Category(categoryName)
);

-- Create the TransactionHistory table if it doesn't exist
CREATE TABLE IF NOT EXISTS TransactionHistory (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    assetID INT,
    userID INT,
    purchaseTime TIMESTAMP,
    pricePaid DECIMAL(15,2),
    tokenId VARCHAR(255),
    FOREIGN KEY (assetID) REFERENCES DigitalAssets(assetID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Create the Tokens table if it doesn't exist
CREATE TABLE IF NOT EXISTS Tokens (
    tokenId VARCHAR(255) PRIMARY KEY,
    associatedUserId INT,
    associatedAssetId INT,
    blockChainAddress VARCHAR(255),
    mintTime TIMESTAMP,
    FOREIGN KEY (associatedUserId) REFERENCES Users(userID),
    FOREIGN KEY (associatedAssetId) REFERENCES DigitalAssets(assetID)
);


-- Insert data for Users
INSERT INTO Users (userID, fname, lname, dob, email, password, walletAddress)
VALUES
    ("0", 'John', 'Doe', '1990-05-15', 'john.doe@email.com', 'password123', 'wallet123'),
    ("1", 'Jane', 'Smith', '1985-08-20', 'jane.smith@email.com', 'pass456', 'wallet456'),
    ("2", 'Bob', 'Johnson', '1995-03-10', 'bob.johnson@email.com', 'pass789', 'wallet789');

-- Insert data for DigitalAssets
INSERT INTO DigitalAssets (name, description, price, categoryName)
VALUES
    ('Asset 1', 'Description for Asset 1', 100.00, 'Category A'),
    ('Asset 2', 'Description for Asset 2', 150.00, 'Category B'),
    ('Asset 3', 'Description for Asset 3', 75.00, 'Category A');
