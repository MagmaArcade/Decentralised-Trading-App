/*
Name: 	Nathan Hoorbkaht
		Nicholas Gustin	
		Connor Lack

SID:	103865794
		103995882
		103992223
*/
// this is the Market page. this page is used view all available coins within the market.

import React, { useState } from 'react';
import { Grid, TextField, Select, MenuItem } from "@mui/material"; // import js elements from mui
import "../css/Market.css"; // import the css syles
import axios from 'axios'; // import AXIOS for API integration
import * as d3 from 'd3';

// Market application
function Market() {
	const assets = [
		'SwinCoin', 'ConzoCoin', 'DiamondCoin', 'NebulaCoin', 'Saturnium',
		'FusionX', 'BitGem', 'EtherSphere', 'RipperCoin', 'LiteGem',
		'CardanoSphere', 'LinkStar', 'Stellium', 'PolkaGem', 'CardanoSphere'
	  ];

	// State for the selected asset in dropdown
  	const [allAssets, setAllAssets] = useState();

	function loadDefaultTable() {
		axios.get('http://127.0.0.1:8000/getassetinfo/')
		.then(response => {
			setAllAssets(response.data)
		})
		.catch(error => {
			console.error("Whoops, there was an error: ", error)
		})
	}

	loadDefaultTable();

	function tabulate(data, columns) {
		var table = d3.select('body').append('table')
		var thead = table.append('thead')
		var	tbody = table.append('tbody');
	
		// append the header row
		thead.append('tr')
		  .selectAll('th')
		  .data(columns).enter()
		  .append('th')
			.text(function (column) { return column; });
	
		// create a row for each object in the data
		var rows = tbody.selectAll('tr')
		  .data(data)
		  .enter()
		  .append('tr');
	
		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		  .data(function (row) {
			return columns.map(function (column) {
			  return {column: column, value: row[column]};
			});
		  })
		  .enter()
		  .append('td')
			.text(function (d) { return d.value; });
	
	  	return table;
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

			<div>
				{this.tabulate(allAssets, ['Asset ID', 'Name', 'Description', 'Price', 'Category'])}
			</div>
		</div>
	);
}

export default Market;