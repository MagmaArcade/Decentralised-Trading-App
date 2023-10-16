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
        cursor.execute(query) # execute the querys
        result = cursor.fetchall() # store the data in a temporary variable
        assets = [dict(zip(cursor.column_names, row)) for row in result] # convert the result to a list of dictionaries

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return assets
    except mysql.connector.Error as err:
        return {"error": f"MySQL returned an error: {err}"}

    
    # Get a specified digital asset (via user id)
@app.get("/getuserassets/{userID}")
def get_asset_info(userID: str):
    try:
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = f"SELECT * FROM DigitalAssets WHERE userID = '{userID}'" # Selects all data from the DigitalAssets table for a given asset name
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
@app.get("/getusername/{userID}")
def get_asset_info(userID: str):
    try:
        print(userID)
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = f"SELECT fname FROM Users WHERE userid={userID}" # Selects all data from the Users table
        cursor.execute(query) # execute the query
        result = cursor.fetchone()[0] # store the data in a temporary variable

        print(result)

        # Close the cursor/connection
        cursor.close()
        connection.close()

        return result
    except mysql.connector.Error as err:
        return {"error": f"MySQL returned an error: {err}"}


# Get all wallets from the database
@app.get("/getwalletinfo/")
def get_wallet_info():
    try:
        connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
        cursor = connection.cursor() # create a cursor to execute SQL queries
        query = "SELECT walletAddress FROM Users" # Selects all data from the DigitalAssets table
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


# Session Handling

# API call that runs when the app starts the first time
# Generates session handling file in the correct format without any token
@app.get("/sessioninitialiser")
def sessionInitialiser():
    initalSession = {
        "token": ""
    }
    with open('../src/localdata/currentSession.json', 'w') as file:
        json.dump(initalSession, file)
    return

# API call that reads the existing file to return the current session token
@app.get("/currentsessiontoken")
def currentSessionToken():
    with open('../src/localdata/currentSession.json', 'r') as file:
        token = json.load(file)
    return(token)

# Login Validation 
class LoginData(BaseModel):
    email: str
    password: str

@app.post("/validatelogin")
async def login(user: LoginData):
    connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
    cursor = connection.cursor() # create a cursor to execute SQL queries
    
    # Load values into local variables
    _email = user.email
    _password = user.password

    try:
        query = f"SELECT userID FROM Users WHERE email='{_email}' AND password='{_password}'"
        cursor.execute(query)
        
        db_user = cursor.fetchone()

        if db_user:
            userid = db_user[0]
            useridstr = str(userid)
            setSessionToken(useridstr)
            execute_sql_file()
            return {"status": "success"}
        else:
            return {"status": "failure", "detail": "Invalid email address or password" }
        
    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        cursor.close()
        connection.close()

# function that sets the session token to the validated user
def setSessionToken(userID: str):
    currentSession = {
        "token": userID
    }
    with open('../src/localdata/currentSession.json', 'w') as file:
        json.dump(currentSession, file)
    return

# fuction to create a new databasae and tables if they dont yet exist
def execute_sql_file():
    try:
        sql_file = "createdb.sql"

        # Establish a connection to the MySQL server
        connection = mysql.connector.connect(**db_configuration)
        cursor = connection.cursor()

        # Read and execute the SQL script
        #with open(sql_file, 'r') as sql_script:

        #    cursor.execute(sql_script.read(), multi=True)

        #connection.commit()
        #connection.close()

        print(f'Successfully executed {sql_file} to create tables in MySQL database')
    except mysql.connector.Error as e:
        print(f'Error: Failed to execute {sql_file} in MySQL database')
        print(e)


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

# Code to take and deploy the 'Users.sol' Smart Contract or the 'tradeassets.sol' Smart Contract onto the local chain using account with index 0
@app.get("/deploymainsc")
async def deploySmartContract():
        w3.eth.defaultAccount = w3.eth.accounts[0]

        with open(f"./main.sol", "r") as file:
            sc_file = file.read()
            
        install_solc("0.8.0")
        compiled_sol = compile_standard(
            {
                "language": "Solidity",
                "sources": {"main.sol": {"content": sc_file}},
                "settings": {
                    "outputSelection": {
                        "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                    }
                },
            },
            solc_version="0.8.0",
            allow_paths="*"
        )

        contracts = ["Users", "Assets", "TransferAssets"]

        for con in contracts:
            # get bytecode
            bytecode = compiled_sol["contracts"]["main.sol"][con]["evm"]["bytecode"]["object"]

            # get abi
            abi = compiled_sol["contracts"]["main.sol"][con]["abi"]

            SmartContract = w3.eth.contract(abi=abi, bytecode=bytecode)

            transaction = SmartContract.constructor().build_transaction(
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

            # standardise the contract information into JSON values for return in a way axios can understand
            contract = ContractInfo(conaddress=tx_receipt.contractAddress, conabi = abi)
            

            # Returns deployed contract address and abi to be posted for interactions with the contract
            # write these return values to a file for reference later in the application
            with open(f'../src/localdata/{con}contractinfo.json', 'w') as file:
                
                # honestly the most circular bit of code ever written - to dump the Type ContractInfo into a file, it needs to be JSON, which Py doesn't recognise (even though it is formatted like that)
                # thus, we take the ContractInfo, specifically code it into JSON, then load that JSON to remove the weird backslashes and literals. THEN we write to a file for reference in later applications.
                contractjson = json.dumps(contract, default=lambda o: o.__dict__)
                temp = json.loads(contractjson)
                json.dump(temp, file)

            # for any smart contract, write the address to the database so the TradeAssets contract can reference it later
            scaddress = tx_receipt.contractAddress

            connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
            cursor = connection.cursor() # create a cursor to execute SQL queries
            
            query = "INSERT INTO contractinformation (contractName, address) VALUES (%s, %s)"
            cursor.execute(query, [con, scaddress])

            connection.commit() # Commit the changes

            # If the contract being deployed is the TransferAssets contract, call setUsableContracts()
            # This will set the address of the already deployed User/Assets smart contracts inside the TransferAssets contract for instance creation
            if(con == "TransferAssets"):
                addresses = []

                # First, get the address of the user smart contract that we just committed to the databaase
                query = "SELECT address FROM contractinformation WHERE contractName='Users'"
                cursor.execute(query) # execute the query
                userscaddress = cursor.fetchone()[0] # Stores the address
                addresses.append(userscaddress) # push this into the array

                # Do the same for the Assets smart contract
                query = "SELECT address FROM contractinformation WHERE contractName='Assets'"
                cursor.execute(query) # execute the query
                assetscaddress = cursor.fetchone()[0] # Stores the address
                addresses.append(assetscaddress) # push this into the array

                # Initalise an instance of our just deployed TransferAssets SC
                TAContract = w3.eth.contract(
                    address = tx_receipt.contractAddress,
                    abi = abi
                )

                # Now we call the contract function, passing in the two values we just retrieved from the database
                _tx_hash = TAContract.functions.setUsableContracts(addresses[0], addresses[1]).transact() # calls the function that puts user information onto the blockchain    
                _tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

            # Close the cursor/database connection
            cursor.close()
            connection.close()



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
    
    # Connect to the MySQL database - we need to ascertain how many users already exist in order to correctly assign this user a user ID (primary keys can't clash)
    connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
    cursor = connection.cursor() # create a cursor to execute SQL queries
    query = f"SELECT COUNT(*) FROM Users" # Gets a count of the current entries in the users table
    cursor.execute(query) # execute the query
    current_user_count = cursor.fetchone()[0] # Stores the count
    
    # Since the users start from 0, getting a current count would always ensure that our new, assigned user ID is unique and follows a logical sequence
    userid = str(current_user_count)

    # Transaction that places the user data on the blockchain
    tx_hash = UsersContract.functions.createUser(userid, [user.fname, user.lname, user.dob, user.email, user.password]).transact() # calls the function that puts user information onto the blockchain    
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Call the get user function to get user data for update in the local database
    payload = UsersContract.functions.getUser(userid).call()

    user_address = w3.eth.accounts[current_user_count + 1] # assign this user a wallet account (starting at 1, as our Ganache account that deploys the create user contract is account 0)
    
    query = "INSERT INTO users (userID, fname, lname, dob, email, password, walletAddress) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (int(userid), payload[0], payload[1], payload[2], payload[3], payload[4], user_address))

    connection.commit() # Commit the changes

    # Close the cursor/connection
    cursor.close()
    connection.close()

    return

# Handle Initial Asset and User Creation 
# NB: These values are HARDCODED - users cannot create digital assets, therefore we have supplied some to be used for testing
# NB: The user created in this method (User with the id of 0) will be the owner of all assets on startup
# GET at start of the app that will deploy assets onto blockchain and update the database with returned values
@app.get("/createdemodata")
async def createDemoData():

    # CREATING DEMO USER DATA
    # Open the contract with the address/abi that was written to file
    # Usually we'd pass this in, but once again this function is HARDCODED as a demo
    with open(f'../src/localdata/userscontractinfo.json', 'r') as file:    
        contractjson = json.load(file)
    
    UsersContract = w3.eth.contract(
        address = contractjson["conaddress"],
        abi = contractjson["conabi"]
    )    

    # Default Ganache Account (same one that created the contract, 'our' account)
    w3.eth.default_account = w3.eth.accounts[0]

    # Define our User for creation
    user = ["0", "Admin", "AssetSphere", "2003-06-06", "admin@assetsphere.com", "Password123", w3.eth.accounts[1]]
    
    # Transaction that places the user data on the blockchain as per requirements
    tx_hash = UsersContract.functions.createUser(user[0], [user[1], user[2], user[3], user[4], user[5], user[6]]).transact() # calls the function that puts user information onto the blockchain    
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Call the get user function to get user data for update in the local database
    payload = UsersContract.functions.getUser("0").call()

    connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
    cursor = connection.cursor() # create a cursor to execute SQL queries
    query = "INSERT INTO users (userID, fname, lname, dob, email, password, walletAddress) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (int(user[0]), payload[0], payload[1], payload[2], payload[3], payload[4], user[6]))
    

    
    # CREATING DEMO ASSET DATA:

    # Open the contract with the address/abi that was written to file
    # Usually we'd pass this in, but once again this function is HARDCODED as a demo
    with open(f'../src/localdata/assetscontractinfo.json', 'r') as file:    
        contractjson = json.load(file)
    
    AssetsContract = w3.eth.contract(
        address = contractjson["conaddress"],
        abi = contractjson["conabi"]
    )
    
    # Define our Assets for creation
    assets = [
        ["0", "0", "Asset 1", "Cool asset", "100.0", "Category A"],
        ["1", "0", "Asset 2", "Awesome asset", "50.0", "Category B"],
        ["2", "0", "Asset 3", "Epic asset", "75.0", "Category A"]
    ]

    # Deploy data (nested loops didn't work for whatever reason)
    tx_hash = AssetsContract.functions.createAsset(assets[0][0], [assets[0][1], assets[0][2], assets[0][3], assets[0][4], assets[0][5]]).transact() # calls the function that puts user information onto the blockchain    
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    tx_hash = AssetsContract.functions.createAsset(assets[1][0], [assets[1][1], assets[1][2], assets[1][3], assets[1][4], assets[1][5]]).transact() # calls the function that puts user information onto the blockchain    
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    tx_hash = AssetsContract.functions.createAsset(assets[2][0], [assets[2][1], assets[2][2], assets[2][3], assets[2][4], assets[2][5]]).transact() # calls the function that puts user information onto the blockchain    
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    

    # Code that inserts Asset Data into the MySQL database as per requirements

    query = "INSERT INTO digitalassets (assetID, userId, name, description, price, categoryName) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (int(assets[0][0]), int(assets[0][1]), assets[0][2], assets[0][3], assets[0][4], assets[0][5]))
    
    query = "INSERT INTO digitalassets (assetID, userId, name, description, price, categoryName) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (int(assets[1][0]), int(assets[1][1]), assets[1][2], assets[1][3], assets[1][4], assets[1][5]))
    
    query = "INSERT INTO digitalassets (assetID, userId, name, description, price, categoryName) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (int(assets[2][0]), int(assets[2][1]), assets[2][2], assets[2][3], assets[2][4], assets[2][5]))


    connection.commit() # Commit the changes

    # Close the cursor/connection
    cursor.close()
    connection.close()

    return

# Handle Asset Transfer
class assetTransferData(BaseModel):
    conaddress: str
    conabi: tuple
    userFrom: str
    walletTo: str
    assetName: str

@app.post("/transferasset")
async def transferAsset(transferdata: assetTransferData):
    
    # Open the contract with the address/abi that was passed in by AXIOS
    TransferContract = w3.eth.contract(
        address = transferdata.conaddress,
        abi = transferdata.conabi
    )

    # Ease readability by loading in the corresponding values of the above into local function variables
    _userFrom = transferdata.userFrom
    _walletTo = transferdata.walletTo
    _assetName = transferdata.assetName

   # Connect to the MySQL database - get some local variables
    connection = mysql.connector.connect(**db_configuration) # attempt to connect to the database using credential information
    cursor = connection.cursor() # create a cursor to execute SQL queries

    # Lets get the Wallet Address of the user executing this command
    query1 = f"SELECT walletAddress FROM Users WHERE userID={_userFrom}" # Gets the wallet ID of the user executing this call
    cursor.execute(query1) # execute the query
    _walletFrom = cursor.fetchone()[0] # Stores the wallet address

    # Lets get the user ID of the wallet we're sending this asset to
    query2 = f"SELECT userID FROM Users WHERE walletAddress='{_walletTo}'" # Gets the wallet ID of the user executing this call
    cursor.execute(query2) # execute the query
    _userTo = cursor.fetchone()[0] # Stores the wallet address

    _userTostring = str(_userTo)

    # Currently we have the userID and walletAddress of both sender & reciever, as well as the ID of the asset we want to transfer
    # Now we 
    

    return