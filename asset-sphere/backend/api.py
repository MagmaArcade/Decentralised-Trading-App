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
        query = f"SELECT * FROM DigitalAssets WHERE name = '{name}'" # Selects all data from the DigitalAssets table for a given asset name
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
        query = "SELECT * FROM Users" # Selects all data from the Users table
        cursor.execute(query) # execute the query
        result = cursor.fetchall() # store the data in a temporary variable
        user = [dict(zip(cursor.column_names, row)) for row in result] # convert the result to a list of dictionaries

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return user
    except mysql.connector.Error as err:
        return {"error": f"MySQL returned an error: {err}"}

# Get Transaction information from the database, to be used for listing dynamic information
@app.get("/gettrasactionhistoryinfo/{userID}")
def get_asset_info(userID: str):
    try:
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = f"SELECT * FROM TransactionHistory WHERE userID = '{userID}'" # Selects all data from the TransactionHistory table for a given user
        cursor.execute(query) # execute the query
        result = cursor.fetchall() # store the data in a temporary variable
        history = [dict(zip(cursor.column_names, row)) for row in result] # convert the result to a list of dictionaries

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return history
    except mysql.connector.Error as err:
        return {"error": f"MySQL returned an error: {err}"}
    
# Get User ID from the database, to be used in the auth token
@app.get("/getuserid/{email}")
def get_asset_info(email: str):
    try:
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = f"SELECT userId FROM Users WHERE email = '{email}'" # Selects user data from the DigitalAssets table
        cursor.execute(query) # execute the query
        result = cursor.fetchall() # store the data in a temporary variable
        userId = [dict(zip(cursor.column_names, row)) for row in result] # convert the result to a list of dictionaries

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return userId
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
        # write these return values to a file for reference later in the application
        with open('../src/localdata/usercontractinfo.json', 'w') as file:
            
            # honestly the most circular bit of code ever written - to dump the Type ContractInfo into a file, it needs to be JSON, which Py doesn't recognise (even though it is formatted like that)
            # thus, we take the ContractInfo, specifically code it into JSON, then load that JSON to remove the weird backslashes and literals. THEN we write to a file for reference in later applications.
            contractjson = json.dumps(contract, default=lambda o: o.__dict__)
            temp = json.loads(contractjson)
            json.dump(temp, file)

        return

# Code that interacts with the deployed User smart contract to create a new User on the blockchain and return the data to be updated by the database

@app.post("/createuser")
async def createUser(user: CreateUsersRequest):

    # Default Ganache Account (same one that created the contract, 'our' account)
    w3.eth.default_account = w3.eth.accounts[0]

    # Open the contract with the address/abi that was passed in by AXIOS
    UsersContract = w3.eth.contract(
        address = user.conaddress,
        abi = user.conabi
    )
    
    # Create the user data 'payload' (the information to be stored on the chain)
    userdata = (user.fname + "," + user.lname + "," + user.dob + "," + user.email + "," + user.password)

    # Connect to the MySQL database - we need to ascertain how many users already exist in order to correctly assign this user a user ID (primary keys can't clash)
    connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
    cursor = connection.cursor() # create a cursor to execute SQL queries
    query = f"SELECT COUNT(*) FROM Users" # Gets a count of the current entries in the users table
    cursor.execute(query) # execute the query
    current_user_count = cursor.fetchone()[0] # Stores the count
    
    # Since the users start from 0, getting a current count would always ensure that our new, assigned user ID is unique and follows a logical sequence
    userid = str(current_user_count)

    # Transaction that places the user data on the blockchain
    tx_hash = UsersContract.functions.createUser(userid, userdata).transact() # calls the function that puts user information onto the blockchain
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Call the get user function to get user data for update in the local database
    payload = UsersContract.functions.getUser(userid).call()

    # Now we take the payload data and enter it into our MySQL database, ensuring changes on the blockchain reflect in our backend
    split_payload = payload.split(',') # split the CSV into an array

    # Grab a Ganache account address to use for this created user
    
    user_address = w3.eth.accounts[current_user_count + 1] # assign this user a wallet account (starting at 1, as our Ganache account that deploys the create user contract is account 0)
    
    query = "INSERT INTO users (userID, fname, lname, dob, email, password, walletAddress) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (int(userid), split_payload[0], split_payload[1], split_payload[2], split_payload[3], split_payload[4], user_address))

    connection.commit() # Commit the changes

    # Close the cursor/connection
    cursor.close()
    connection.close()

    return
    
class SessionManager:
    def __init__(self):
        self.data = ""

    def set_auth_token(self, auth_token):
        self.data['auth_token'] = auth_token

    def get_auth_token(self):
        return self.data.get('auth_token')

    def clear_all(self):
        self.data = ""
