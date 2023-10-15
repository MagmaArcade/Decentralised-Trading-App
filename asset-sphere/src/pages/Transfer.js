/*
Name:   Nathan Hoorbkaht
        Nicholas Gustin 
        Connor Lack

SID:    103865794
        103995882
        103992223
*/
// this is the Transfer page. this page is view singular asset breakdowns, including options to Transfer.
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from "@mui/material";
import axios from 'axios';
import "../css/Transfer.css"; // import css styling
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


var currentSessionToken = "";    // Will initalise as blank, but this will be called before any checks: therefore, if a session token exists, it will be updated before any calls on this variable are run
const assets = [];


// Get list of wallets outside of render loop
const wallets = [];
axios.get('http://127.0.0.1:8000/getwalletinfo/')
    .then(response => {
      Object.values(response.data).map(({ walletAddress }) => wallets.push(walletAddress) );
    })
    .catch(error => {
      console.error("Whoops, there was an error: ", error)
    })

// Transfer application
function Transfer() {  
  let contractData = require('../localdata/transferassetscontractinfo.json');

  const navigate = useNavigate();

  const [allAssets, setAllAssets] = useState('[]');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('[]');

  const query = (`http://127.0.0.1:8000/getuserassets/${currentSessionToken}`);
  
  // Fetch assets from API on component mounts
  useEffect(() => {
    // Gets the current Session ID (i.e. which user is logged in?)
    getCurrentSession();
    loadData();
  }, [selectedAsset]);  

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


  function loadData() {
      axios.get(query)
        .then(response => {
            setAllAssets(response.data)
            // Extract names from the response and add to the assets array
            Object.values(response.data).forEach(({ name }) => {
              if (!assets.includes(name)) {
                assets.push(name); // Add the name if it doesn't exist in the array
              }
            })
        })
        .catch(error => {
            console.error("Whoops, there was an error: ", error)
        })
  }

    // Handle user input React Hook changes outside of the return value (prevent infinite loops)
  const onFilterChange = (e) => {
    setSelectedAsset(e.target.value);
    };

  const onWalletAddressChange = (e) => {
    setSelectedWallet(e.target.value);
  }

  const handleAssetTransfer = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/transferasset",
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      data: {
        "conaddress": contractData.conaddress,
        "conabi": contractData.conabi,
        "userFrom": currentSessionToken,
        "walletTo": selectedWallet,
        "assetName": selectedAsset,
      }
    })
    .then((response) => {
      console.log(response);
  })

  }


  const render = () => {
    return Object.values(allAssets).filter(asset => asset.name === selectedAsset).map(({ assetID, name, description, price, categoryName }) => {
      return (
        <div className="asset-info" key={assetID}>
          <div className="transfer-top">
            <p>
              <span className="asset-name">{name}</span>
              <span className="category-text">{categoryName}</span>
            </p>       
          </div>
          <div className="transfer-middle">
            <p>
              <span className="asset-value">{price}</span> <span className="transfer-currency">AUD</span>
            </p>
          </div>
          <div className="asset-description">
            <p>{description}</p>
          </div>
        </div>
      );
    });
  };

    return (
      <><Navbar/><div className="transfer">
        <div className="transfer-main-container">
          <div className="transfer-left-container">
            {render()}
            <Select
              value={selectedAsset}
              onChange={onFilterChange}
              displayEmpty
              color="success"
              sx={{
                width: 150,
                height: 50,
                color: '#FFFFFF',
                backgroundColor: '#3b3b3b'
              }}
              className="MuiSelect-root"
            >
              <MenuItem value="" default disabled>
                Select Asset
              </MenuItem>

              {/* Maps the values loaded into const assets at page loading into dropdown selection options */}
              {assets.map((asset) => (
                <MenuItem value={asset} key={asset}>
                  {asset}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="transfer-right-container">
            <h1>Transfer Assets</h1>
            <div className="transfer-right-container">
              <Select
                value={selectedWallet}
                onChange={onWalletAddressChange}
                displayEmpty
                color="success"
                className="transfer-input-container"
              >
                <MenuItem value="" default disabled>
                  Select Wallet
                </MenuItem>

                {/* Maps the values loaded into const assets at page loading into dropdown selection options */}
                {wallets.map((wallet) => (
                  <MenuItem value={wallet} key={wallet}>
                    {wallet}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <button className="transfer-purchase-btn" onClick={handleAssetTransfer}>Complete Transaction</button>
            </div>
          </div>
        </div>
      </div></>
);
}
export default Transfer;

