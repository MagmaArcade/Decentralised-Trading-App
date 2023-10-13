/*
Name: 	Nathan Hoorbkaht
		Nicholas Gustin	
		Connor Lack

SID:	103865794
		103995882
		103992223
*/
// this is the Market page. this page is used view all available coins within the market.

import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from "@mui/material"; // import js elements from mui
import "../css/Market.css"; // import the css syles
import axios from 'axios'

// Get the initial asset list before the main application is exported/React loop starts
const assets = [];
axios.get('http://127.0.0.1:8000/getassetinfo/')
		.then(response => {
			Object.values(response.data).map(({ name }) => assets.push(name) );
		})
		.catch(error => {
			console.error("Whoops, there was an error: ", error)
		})

	
// Market application
function Market() {

	// State variable which stores every asset in the database
  	const [allAssets, setAllAssets] = useState('[]');

	// State variable which stores the asset you're trying to filter by
	const [selectedAsset, setSelectedAsset] = useState('');

	// State variable which stores the asset you're trying to search by
	const [searchedAsset, setSearchedAsset] = useState('');

	// String that calls the API to retrieve data from the database, optionally appending your selected asset
	const query = ("http://127.0.0.1:8000/getassetinfo/" + selectedAsset.toString())
	
	
	// Function that will automatically (re)render the table upon startup/filter/search
	useEffect(() => {
		loadTableData();
	}, [selectedAsset]);

	// AXIOS function to request data from the API/Database
	function loadTableData() {
		axios.get(query)
		.then(response => {
			setAllAssets(response.data)
		})
		.catch(error => {
			console.error("Whoops, there was an error: ", error)
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

	// Handle user input React Hook changes outside of the return value (prevent infinite loops)
	const onFilterChange = (e) => {
		setSelectedAsset(e.target.value);
	  };

	const onSearchChange = (e) => {
		setSearchedAsset(e.target.value);
	};

	const setSearchedAssetToSelected = () => {
		setSelectedAsset(searchedAsset)
	}

	// Return value (actual HTML code for the Market page)
  	return (
		<div className="market">
			<div className="search">
				<Grid
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					container spacing={2}
				>
					{/* Left Section - Dropdown */}
					<Grid item xs={4}>
						<Select
							value={selectedAsset}
							onChange={onFilterChange}
							displayEmpty
							color="success"
							sx={
								{width: 150, 
								height: 50, 
								color: '#FFFFFF',
								backgroundColor: '#3b3b3b' }
							}
						>
							<MenuItem value="" default>
								Select Asset
							</MenuItem>

							{assets.map((asset) => (
							<MenuItem value={asset} key={asset}>
								{asset}
							</MenuItem>
							))}

						</Select>
					</Grid>
					
					{/* Right Section - Search */}
					<Grid item xs={5} container justifyContent="flex-end" alignItems="center">
						<Grid item xs={6}>
							<TextField 
								value={searchedAsset}
								onChange={onSearchChange}
								className="myTextInput"
								color="success" 
								sx={{ backgroundColor: '#3b3b3b' }} 
								focused 
								/>
						</Grid>
						<Grid item xs={4}>
							<button className="search-btn" onClick={setSearchedAssetToSelected}>Search</button>
						</Grid>
					</Grid>
				</Grid>
			</div>

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
					{renderAssetsInTable()}
				</tbody>
			</table>
	</div>
);
}

export default Market;