/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the trade page. this page is view singular asset breakdowns, including options to trade.
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from "@mui/material";
import axios from 'axios';
import "../css/Trade.css"; // import css styling

const assets = [];
axios.get('http://127.0.0.1:8000/getassetinfo/')
    .then(response => {
        Object.values(response.data).map(({ name }) => assets.push(name));
    })
    .catch(error => {
        console.error("Whoops, there was an error: ", error);
    });

// Trade application
function Trade() {

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
          <div className="trade-top">
            <p>
              <span className="trade-asset-text">{name}</span>
              <span className="trade-btc-text">{categoryName}</span>
            </p>       
          </div>
          <div className="trade-middle">
            <p>
              <span className="trade-asset-value">{price}</span> <span className="trade-currency">AUD</span>
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
      <div className="trade">
        <div className="trade-main-container">
          <div className="trade-left-container">
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
          <div className="trade-right-container">
            <h1>Trade Currency</h1>
            <div>
              <label className="trade-label" htmlFor="trade-amount">Amount</label>
            </div>
            <div className="trade-input-container">
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder=""
              />
              <label className="trade-dollar-label">$</label>
            </div>

            <div>
              <button className="trade-purchase-btn">TRADE</button>
            </div>
          </div>
        </div>
      </div>
);
}
export default Trade;
