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
import * as d3 from 'd3';
import { render } from '@testing-library/react';

// Market application
function Market() {
	// State variable which stores every asset in the database
  	const [allAssets, setAllAssets] = useState('[]');

	// State variable which stores the asset you're trying to filter/search by
	const [selectedAsset, setSelectedAsset] = useState('');

	// String that calls the API to retrieve data from the database, optionally appending your selected asset
	const query = ("http://127.0.0.1:8000/getassetinfo/" + selectedAsset.toString());

	const assets = [
		'SwinCoin', 'NickCoin'
	];

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
							onChange={(e) => setSelectedAsset(e.target.value)}
							displayEmpty
							color="success"
							sx={{ backgroundColor: '#3b3b3b' }}
						>
							<MenuItem value="">
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
							<TextField className="myTextInput" color="success" sx={{ backgroundColor: '#3b3b3b' }} focused />
						</Grid>
						<Grid item xs={4}>
							<button className="search-btn">Search</button>
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