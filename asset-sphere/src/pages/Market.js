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
	const assets = [
		'SwinCoin', 'ConzoCoin', 'DiamondCoin', 'NebulaCoin', 'Saturnium',
		'FusionX', 'BitGem', 'EtherSphere', 'RipperCoin', 'LiteGem',
		'CardanoSphere', 'LinkStar', 'Stellium', 'PolkaGem', 'CardanoSphere'
	  ];

	// State for the selected asset in dropdown
  	const [selectedAsset, setSelectedAsset] = useState('');

  	// State for the search input
  	const [searchTerm, setSearchTerm] = useState('');

	// State variable for retrieving data from the API
  	const [allAssets, setAllAssets] = useState('[]');

	useEffect(() => {
		loadDefaultTable();
	}, []);

	function loadDefaultTable() {
		axios.get('http://127.0.0.1:8000/getassetinfo/')
		.then(response => {
			setAllAssets(response.data)
			console.log(response.data)
		})
		.catch(error => {
			console.error("Whoops, there was an error: ", error)
		})
	}

	const renderAssets = () => {
		return Object.values(allAssets).map(({ assetID, name, description, price, categoryName }) => {
		  return <tr key={assetID} >
		  <td>{assetID}</td>
		  <td>{name}</td>
		  <td>{description}</td>
		  <td>{price}</td>
		  <td>{categoryName}</td>
		</tr>
		})
	  }
	
	

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
							<MenuItem value="" disabled>
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
					{renderAssets()}
				</tbody>
			</table>
	</div>
);
}

export default Market;