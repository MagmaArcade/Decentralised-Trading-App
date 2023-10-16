/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the Register page. this page is used view a users owned coins.

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Grid } from "@mui/material"; // import js elements from mui
import "../css/Wallet.css"; // import css styling
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


var currentSessionToken = "";    // Will initalise as blank, but this will be called before any checks: therefore, if a session token exists, it will be updated before any calls on this variable are run

// Wallet application
function Wallet() {
  const navigate = useNavigate();
  

  // State variable which stores every asset in the database
  const [allAssets, setAllAssets] = useState('[]');
  
	// State variable which stores the asset you're trying to filter by
	const [selectedAssetHistory, setSelectedAssetHistory] = useState('[]');

  // State variable which stores the wallet ID of the logged in user
  const [walletAddress, setWalletAddress] = useState("")
  
  // Calls the API to get the current Session Token (i.e. which user is logged in)
  function getCurrentSession() {
    axios.get('http://127.0.0.1:8000/currentsessiontoken/')
    .then(response => {
      // Maps the returned session token to the currentSessionToken variable
      currentSessionToken = response.data.token;

      // If no user is logged in, push to Login page
      if (currentSessionToken == "") {
        navigate("/Login")
      }
    })
    .catch(error => {
        console.error("Whoops, there was an error: ", error);
    });
  }

  const queryUserHistory = (`http://127.0.0.1:8000/gettrasactionhistoryinfo/${walletAddress}`);

  // String that calls the API to retrieve user assets from the database for the current user
  const queryUserAssets = (`http://127.0.0.1:8000/getuserassets/${currentSessionToken}` + allAssets);

	// Function that will automatically render the table upon startup
	useEffect(() => {
    // Gets the current Session ID (i.e. which user is logged in?)
    getCurrentSession();

    renderUserId();

    // Load table data based on selectedAssetHistory
    loadHistoryTableData();
  
    // Load DigitalAssets table data when AllAssets dependency changes
    loadAssetTableData();
  }, [currentSessionToken]);
  

	// AXIOS function to request data from the API/Database
	function loadHistoryTableData() {
		axios.get(queryUserHistory)
		.then(response => {
			setSelectedAssetHistory(response.data)
		})
		.catch(error => {
			console.error("Whoops, there was an error: ", error)
		})
	}
  // AXIOS function to request data from the API/Database
	function loadAssetTableData() {
		axios.get(queryUserAssets)
		.then(response => {
			setAllAssets(response.data)
		})
		.catch(error => {
			console.error("Whoops, there was an error: ", error)
		})
	}


	// Function which dynamically renders returned asset data in the form of a HTML table
	const renderHistoryInTable = () => {
		return Object.values(selectedAssetHistory).map(({ transactionID, assetName, userID, userTo, purchaseTime, pricePaid}) => {
		  return <tr key={transactionID}>
		  <td>{transactionID}</td>
		  <td>{assetName}</td>
		  <td>{userID}</td>
      <td>{userTo}</td>
		  <td>{purchaseTime}</td>
		  <td>{pricePaid}</td>
		</tr>
		})
	}
  // Function which dynamically renders returned asset data in the form of a HTML table
  const renderAssetsInTable = () => {
    return Object.values(allAssets).map(({ assetID, name, description, price, categoryName }) => {
      return <tr key={assetID}>
      <td>{assetID}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{categoryName}</td>
    </tr>
    })
  }

  
  const renderUserId = () => {
    const queryWalletAddress = (`http://127.0.0.1:8000/getwalletinfo/${currentSessionToken}`);

    axios.get(queryWalletAddress)
    .then(response => {
      Object.values(response.data).map(({ walletAddress }) => setWalletAddress(walletAddress))
    })
    .catch(error => {
        console.error("Whoops, there was an error: ", error);
    });  
    
    return  <p>Wallet ID: {walletAddress} </p>
  }

  return (
    <><Navbar /><div className="Wallet">
      <Grid id="wallet-id-container"
        direction="row"
        justifyContent="center"
        alignItems="center"
        container spacing={2}>
        {renderUserId()}
        <Grid item xs={3}>
          <item>

          </item>
        </Grid>
      </Grid>

      <div className="wallet-main-container">
        <div className="wallet-left-container">
          <h1 className="wallet-h1"> Transaction History </h1> {/* will display all previous transactions */}
          <table>  {/* in this table element, all available assets will be displayed */}
            <thead>
              <tr className="wallet-p">
                <th>Transaction ID</th>
                <th>Asset Name</th>
                <th>Sent From</th>
                <th>Sent To</th>
                <th>Purchase Time</th>
                <th>Price Paid</th>
              </tr>
            </thead>
            <tbody>
              {renderHistoryInTable()}
            </tbody>
          </table>
        </div>

        <div className="wallet-right-container">
          <h1> Current Assets </h1> {/* will display all currently owned assets */}
          <table>  {/* in this table element, all assets that belong to this user will be displayed */}
            <thead>
              <tr className="asset-p">
                <th>Asset ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {renderAssetsInTable()}
            </tbody>
          </table>
        </div>
      </div>
    </div></>
  );  
}

export default Wallet;