## Installation Prerequisites

Before deploying the backend, you must ensure that the required dependencies are installed. The following libraries and tools are necessary:

### Backend Dependencies
- [FastAPI](https://fastapi.tiangolo.com/)
  - Install with: `pip install "fastapi[all]"`
- MySQL Python Connector
  - Install with: `pip install mysql-connector-python`
- Web3.py
  - Install with: `pip install web3`
- py-solc-x
  - Install with: `pip install py-solc-x`

### Frontend Dependencies
Before deploying the frontend, you must ensure that Node.JS version 18.17.1 is installed on your machine.

1. Open a command prompt or terminal.
2. Navigate to the "asset-sphere" application folder (exported from the zipped submission).
3. Run the following commands within the folder:
   - Install module dependencies: `npm install`
   - Install frontend dependencies: `npm install @mui/material @emotion/react @emotion/styled react-router-dom axios cors`

### Database Setup
For the database, you need to have MySQL Server 8.1 installed on your local device. Ensure that a MySQL database instance is running on localhost and valid credentials are available for this instance.

### Smart Contract Interaction
Before making calls to smart contracts, you should have [Ganache v2.7.1](https://www.trufflesuite.com/ganache) installed on your device.

## Deploying the Application

### 1. Create an Instance of the Database
In the folder \asset-sphere\backend, you will find a file called "createdb.sql". Execute the SQL statements in this file by either loading it in your GUI of choice or copying and pasting it into a logged-in MySQL console. You'll know it's successful if a database called "assetsphere" appears when querying the local SQL server for databases.

### 2. Start Ganache and Choose 'Quickstart (Ethereum)'
Copy the private key from the address at index 0 to your clipboard.

### 3. Update constants.py
In the folder \asset-sphere\backend, locate the file "constants.py". Paste the private key you copied from Ganache into the variable indicated by comments.

### 4. Update Database Credentials
If necessary, update the database credentials in "constants.py" to ensure that FastAPI can establish connections to the database. Save the file.

### 5. Start the Backend Server
In your custom Conda environment, navigate to \asset-sphere\backend and execute the command:
C:...\asset-sphere\backend> uvicorn api:app

### 6. Start the Application
In a command prompt, execute the command:
C:...\asset-sphere> npm start


**TIP:** Ensure that neither of these command windows is stuck due to an inadvertent click, which might stop the console window from refreshing.

### 7. Create Demo Data
To add initial data for demonstration purposes:
- Open the page: http://127.0.0.1:8000/createdemodata
- If the page returns "success," you're ready to proceed.

Enjoy exploring the application!

### Demo Data User Details
- User[0]: admin@assetsphere.com, Password123 – Currently owns three assets
- User[1]: john@doe.com, Password123 – Currently owns no assets

## Important Notice
This application is designed as a single-page application. Certain functions and API calls are set to run once on app render due to the absence of a server for hosting. Therefore, **do not hit the 'refresh' button or F5** after the application starts. Individual pages within the application will be re-rendered with new data upon loading. To refresh a page, navigate in and out using the navbar.

## Reset Instructions
If something goes wrong during application startup or testing, you may need to follow these steps to clear temporary data and redeploy:

1. Stop the Uvicorn/NPM command windows.
2. Drop and recreate the database (see Step 1).
3. Delete all files in "asset-sphere\src\localdata."
4. If a new Ganache session was started, ensure the private key in "constants.py" is up to date (Step 3).
5. Follow steps 4 - 6 to initiate a new load.
