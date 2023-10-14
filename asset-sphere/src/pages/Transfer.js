/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the Transfer page. this page is view singular asset breakdowns, including options to Transfer.
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from "@mui/material";
import axios from 'axios';
import "../css/Transfer.css"; // import css styling

const assets = [];
axios.get('http://127.0.0.1:8000/getassetinfo/')
    .then(response => {
        Object.values(response.data).map(({ name }) => assets.push(name));
    })
    .catch(error => {
        console.error("Whoops, there was an error: ", error);
    });

// Transfer application
function Transfer() {

  const [allAssets, setAllAssets] = useState('[]');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [searchedAsset, setSearchedAsset] = useState('');
  const query = ("http://127.0.0.1:8000/getassetinfo/" + selectedAsset.toString());
  
  // Fetch assets from API on component mount
  useEffect(() => {
      loadTableData();
  }, [selectedAsset]);  

  function loadTableData() {
      axios.get(query)
        .then(response => {
            setAllAssets(response.data)
        })
        .catch(error => {
            console.error("Whoops, there was an error: ", error)
        })
  }

    // Handle user input React Hook changes outside of the return value (prevent infinite loops)
	const onFilterChange = (e) => {
		setSelectedAsset(e.target.value);
	  };

  const render = () => {
    return Object.values(allAssets).map(({ assetID, name, description, price, categoryName }) => {
      return (
        <div className="asset-info" key={assetID}>
          <div className="transfer-top">
            <p>
              <span className="transfer-asset-text">{name}</span>
              <span className="transfer-btc-text">{categoryName}</span>
            </p>       
          </div>
          <div className="transfer-middle">
            <p>
              <span className="transfer-asset-value">{price}</span> <span className="transfer-currency">AUD</span>
            </p>
          </div>
          <div className="statistics">
            <p>{description}</p>
          </div>
        </div>
      );
    });
  };

    return (
      <div className="transfer">
        <div className="transfer-main-container">
          <div className="transfer-left-container">
            {render()};
            <Select
                value={selectedAsset}
                onChange={onFilterChange}
                displayEmpty
                color="success"
                sx={
                  {width: 150, 
                  height: 50, 
                  color: '#FFFFFF',
                  backgroundColor: '#3b3b3b' }}
                  className="MuiSelect-root"
              >
                <MenuItem value="" default>
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
            <div>
              <label className="transfer-label" htmlFor="transferToAccount">Transfer To</label>
            </div>
            <div className="transfer-input-container">
              <input
                type="text"
                id="transferToAccount"
                name="transferToAccount"
                placeholder=""
                maxlength="12"
              />
            </div>

            <div>
              <button className="transfer-purchase-btn">Complete Transaction</button>
            </div>
          </div>
        </div>
      </div>
);
}
export default Transfer;
