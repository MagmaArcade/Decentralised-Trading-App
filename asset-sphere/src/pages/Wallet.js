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


// Wallet application
function Wallet() {

    // inialised constants outside of fetch request
    const queryUserHistory = "";
    const queryUserAssets = "";

  // Fetch the authentication token from the backend
  fetch('/api/get_auth_token')
    .then(response => response.json())
    .then(data => {
      const userID = data.auth_token;

      // String that calls the API to retrieve transaction history from the database for the current user
      queryUserHistory = (`http://127.0.0.1:8000/gettrasactionhistoryinfo/${userID}`)

      // String that calls the API to retrieve user assets from the database for the current user
      queryUserAssets = (`http://127.0.0.1:8000/getassetinfo/${userID}`)
    })
    .catch(error => {
      console.error('Error fetching auth token:', error);
    });


	// State variable which stores the asset you're trying to filter by
	const [selectedAssetHistory, setSelectedAssetHistory] = useState('');

  const navigate = useNavigate();


	// Function that will automatically render the table upon startup
	useEffect(() => {
      loadTableData();
    
	}, [selectedAssetHistory]);

	// AXIOS function to request data from the API/Database
	function loadTableData() {
		axios.get(queryUserHistory)
		.then(response => {
			setSelectedAssetHistory(response.data)
		})
		.catch(error => {
			console.error("Whoops, there was an error: ", error)
		})
	}

	// Function which dynamically renders returned asset data in the form of a HTML table
	const renderHistoryInTable = () => {
		return Object.values(allAssets).map(({ assetID, userID, purchaseTime, pricePaid, tokenId}) => {
		  return <tr key={assetID}>
		  <td>{assetID}</td>
		  <td>{userID}</td>
		  <td>{purchaseTime}</td>
		  <td>{pricePaid}</td>
		  <td>{tokenId}</td>
		</tr>
		})
	}
  // NEED TO PROGRAM HOW WALLET WILL HAVE DATA UPDATED 

  // State variable which stores every asset in the database
  const [allAssets, setAllAssets] = useState('[]');

  // Function that will automatically (re)render the table upon startup/filter/search
  useEffect(() => {
    loadTableData();
  }, [allAssets]);

  // AXIOS function to request data from the API/Database
  /* function loadTableData() { 
    axios.get(queryUserAssets)
    .then(response => {
      setAllAssets(response.data)
    })
    .catch(error => {
      console.error("Whoops, there was an error: ", error)
    })
  } */

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


  return (
    <div className="Wallet">
      <Grid id="wallet-id-container"
        direction="row"
        justifyContent="center"
        alignItems="center"
        container spacing={2}>

        <Grid item xs={3}>
          <item> 
            <p>Wallet ID: 000012</p> {/* will display the users individual wallet id */}
          </item>
        </Grid>
      </Grid>

      <div className="wallet-main-container">
        <div className="wallet-left-container">
          <h1 className="wallet-h1"> Transaction History </h1> {/* will display all previous transactions */}
          <table>  {/* in this table element, all avaliable assets will be displayed */}
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {renderHistoryInTable()}
            </tbody>
			    </table>
	      </div>

        <div className="wallet-right-container">
          <h1> Current Assets </h1> {/* will display all currently owned assets */}
          <div className="wallet-input-container">
          <table>  {/* in this table element, all assets that belong to this user will be displayed */}
            <thead>
              <tr className>
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
      </div>
  </div>
);
}

export default Wallet;