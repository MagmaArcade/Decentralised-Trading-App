from pydantic import BaseModel
import os
import json

from fastapi import FastAPI # fastAPI modules
import mysql.connector # Python MySQL database connector
from web3 import Web3, exceptions # Web3.js (smart contract interactor & error handler)
from solcx import compile_standard, install_solc # Solcx (solidity intepreter for smart contracts)
from fastapi.middleware.cors import CORSMiddleware # security mechanisms
from datetime import datetime # get date time


import constants


# FastAPI initialisation
app = FastAPI()
app.UserSChasDeployed = False # check for the users SC being deployed as a property of the app

origins = ["*"]

# Configure CORS to allow requests from your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow all origins
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

w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545")) # Web3.py/Ganache initialisation

class ContractInfo(BaseModel):
    conaddress: str
    conabi: tuple

class CreateUsersRequest(BaseModel):
    conaddress: str
    conabi: tuple
    fname: str
    lname: str
    dob: str
    email: str
    password: str

# Code to take and deploy the 'Users.sol' Smart Contract onto the local chain using account with index 0
@app.get("/deployusersc")
async def deployUserSmartContract():
    # try:
        w3.eth.defaultAccount = w3.eth.accounts[0]

        with open("./users.sol", "r") as file:
            users_file = file.read()
            
        install_solc("0.8.0")
        users_compiled_sol = compile_standard(
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
        bytecode = users_compiled_sol["contracts"]["users.sol"]["Users"]["evm"]["bytecode"]["object"]

        # get abi
        abi = users_compiled_sol["contracts"]["users.sol"]["Users"]["abi"]

        UsersSC = w3.eth.contract(abi=abi, bytecode=bytecode)

        transaction = UsersSC.constructor().build_transaction(
            {
                "chainId": w3.eth.chain_id,
                "gasPrice": w3.eth.gas_price,
                "from": w3.eth.defaultAccount,
                "nonce": w3.eth.get_transaction_count(w3.eth.defaultAccount),
            }
        )
        transaction.pop('to')


        signed_txn = w3.eth.account.sign_transaction(transaction, private_key=constants.privateKeyGanacheAccount)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        app.UserSChasDeployed = True # changes the check for if the smart contract has been deployed

        # standardise the contract information into JSON values for return in a way axios can understand
        contract = ContractInfo(conaddress=tx_receipt.contractAddress, conabi = abi)

        # Returns deployed contract address and abi to be posted for interactions with the contract
        # write these return values to a file using AXIOS for reference later in the application
        return contract

# Code that interacts with the deployed User smart contract to create a new User on the blockchain and return the data to be updated by the database

@app.post("/createuser")
async def createUser(user: CreateUsersRequest):

    UsersContract = w3.eth.contract(
        address = user.conaddress,
        abi = user.conabi
    )
    
    userdata = (user.fname + "," + user.lname + "," + user.dob + "," + user.email + "," + user.password)
    userid = "1"

    UsersContract.functions.createUser(userid, userdata) # calls the function that puts user information onto the blockchain

    returnedUserData = UsersContract.functions.getUser(userid) # call the function that will get the user data we just encoded to update the database
    
    return returnedUserData