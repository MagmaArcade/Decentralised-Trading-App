from pydantic import BaseModel
import os
import json

from fastapi import FastAPI # fastAPI modules
import mysql.connector # Python MySQL database connector
from web3 import Web3 # Web3.js (smart contract interactor)
from solcx import compile_standard, install_solc # Solcx (solidity intepreter for smart contracts)
from fastapi.middleware.cors import CORSMiddleware # security mechanisms
from datetime import datetime # get date time


# FastAPI initialisation
app = FastAPI()

# Configure CORS to allow requests from your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))


# MySQL database connection information (JSON format)
db_configuration = {
    "host": "localhost",
    "user": "root",
    "password": "rootroot",
    "database": "assetsphere"
}


# Get all Digital Asset information from the database, to be used for listing dynamic information
@app.get("/getassetinfo/")
def get_asset_info():
    try:
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = "SELECT * FROM DigitalAssets" # Selects all data from the DigitalAssets table
        cursor.execute(query) # execute the query
        result = cursor.fetchall() # store the data in a temporary variable
        assets = [dict(zip(cursor.column_names, row)) for row in result] # convert the result to a list of dictionaries

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return assets
    except mysql.connector.Error as err:
        return {"error": f"MySQL returned an error: {err}"}
    
# Get a specifical digital asset via name
@app.get("/getassetinfo/{name}")
def get_asset_info(name: str):
    try:
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = f"SELECT * FROM DigitalAssets WHERE name = '{name}'" # Selects all data from the DigitalAssets table
        cursor.execute(query) # execute the query
        result = cursor.fetchall() # store the data in a temporary variable
        assets = [dict(zip(cursor.column_names, row)) for row in result] # convert the result to a list of dictionaries

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return assets
    except mysql.connector.Error as err:
        return {"error": f"MySQL returned an error: {err}"}
    


# Get User information from the database, to be used for listing dynamic information
@app.get("/getuserinfo/")
def get_asset_info():
    try:
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = "SELECT * FROM Users" # Selects all data from the DigitalAssets table
        cursor.execute(query) # execute the query
        result = cursor.fetchall() # store the data in a temporary variable
        assets = [dict(zip(cursor.column_names, row)) for row in result] # convert the result to a list of dictionaries

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return assets
    except mysql.connector.Error as err:
        return {"error": f"MySQL returned an error: {err}"}


# Get Transaction information from the database, to be used for listing dynamic information
@app.get("/gettrasactionhistoryinfo/")
def get_asset_info():
    try:
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = "SELECT * FROM TransactionHistory" # Selects all data from the DigitalAssets table
        cursor.execute(query) # execute the query
        result = cursor.fetchall() # store the data in a temporary variable
        assets = [dict(zip(cursor.column_names, row)) for row in result] # convert the result to a list of dictionaries

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return assets
    except mysql.connector.Error as err:
        return {"error": f"MySQL returned an error: {err}"}

@app.get("/")
async def start():
    # Ethereum settings
    chain_id = 5777  # Chain ID for Ganache
    my_address = "0x7b185B320441c9Dfea450A7A5F9b130cA207be50"
    private_key = "0x3c59ae2936753b6f732816c7cee51e277d1644ff0335a2f681ea5cbef7919169"

    with open("./backend/SimpleStorage.sol", "r") as file:
        simple_storage_file = file.read()

    install_solc("0.6.0")
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"SimpleStorage.sol": {"content": simple_storage_file}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.6.0",
    )



    # deploy contract



    return "Contract deployed"

"""

@app.get("/purchase")
async def purchase_product(
    productId: int,
    productName: str,
    productDesc: str,
    price: int,
    productCategory: str
):

    timestamp = datetime.now().strftime("%d %b %Y %I:%M:%S %p %Z")

    return {"message": "Purchase successful", "transactionHash": transaction_hash, "timestamp": timestamp}

"""