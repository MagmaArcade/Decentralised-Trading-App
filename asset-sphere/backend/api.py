from pydantic import BaseModel
import os
import json

from fastapi import FastAPI # fastAPI modules
import mysql.connector # Python MySQL database connector
from web3 import Web3 # Web3.js (smart contract interactor)
from solcx import compile_standard, install_solc # Solcx (solidity intepreter for smart contracts)
from fastapi.middleware.cors import CORSMiddleware # security mechanisms
from datetime import datetime # get date time


import constants


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


# MySQL database connection information (JSON format)
db_configuration = {
    "host": "localhost",
    "user": "root",
    "password": constants.databasePassword,
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
    
# Get a specified digital asset (via name)
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

# Smart Contract Stuff Below

# Ganache and Web3.py setup
@app.get("/test")
async def funcTest1():

    # type your address here
    w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

    w3.eth.defaultAccount = w3.eth.accounts[0]

    with open("./users.sol", "r") as file:
        users_file = file.read()
        
    install_solc("0.8.0")
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"users.sol": {"content": users_file}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.8.0",
    )


    # get bytecode
    bytecode = compiled_sol["contracts"]["users.sol"]["Users"]["evm"]["bytecode"]["object"]

    # get abi
    abi = compiled_sol["contracts"]["users.sol"]["Users"]["abi"]

    Users = w3.eth.contract(abi=abi, bytecode=bytecode)

    nonce = w3.eth.get_transaction_count(w3.eth.defaultAccount)

    transaction = Users.constructor().build_transaction(
        {
            "chainId": constants.ganacheChainID,
            "gasPrice": w3.eth.gas_price,
            "from": w3.eth.defaultAccount,
            "nonce": nonce,
        }
    )
    transaction.pop('to')


    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=constants.privateKeyGanacheAccount)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    return "Success"


"""
ganache_url = "http://127.0.0.1:7545"
w3 = Web3(Web3.HTTPProvider(ganache_url))

account = "0x768139e43D9a2b07f64fBC009E06EaFDA16F413A"
privatekey = "0xc121c07225786e7f4457794e4b6461874ba0019263e6be04e1068f4393aeec57"
chainID = "1337"

@app.get("/users")
async def start():
    
    # w3.eth.defaultAccount = w3.eth.accounts[0]
    
    with open("./users.sol", "r") as file:
        users_contract_sol = file.read()

    install_solc("0.8.0")
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"users.sol": {"content": users_contract_sol}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.8.0",
    )

    abi = compiled_sol["contracts"]["users.sol"]["Users"]["abi"]
    bytecode = compiled_sol["contracts"]["users.sol"]["Users"]["evm"]["bytecode"]["object"]

    users_contract = w3.eth.contract(abi=abi, bytecode=bytecode)


    transaction = users_contract.constructor().build_transaction(
        {
            "chainID": chainID,
            "gasPrice": w3.eth.gas_price,
            "from": account,
            "nonce": w3.eth.get_transaction_count(account)
        }
    )
    transaction.pop('to')

    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)


    return tx_receipt
"""

"""
    # Ethereum settings
    chain_id = 5777  # Chain ID for Ganache
    my_address = "0x7b185B320441c9Dfea450A7A5F9b130cA207be50"
    private_key = "0x3c59ae2936753b6f732816c7cee51e277d1644ff0335a2f681ea5cbef7919169"
    """


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