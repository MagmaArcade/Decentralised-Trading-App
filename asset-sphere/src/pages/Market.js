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
			<tr>
				<th>Name</th>
				<th>Price</th>
				<th>Description</th>
				<th>Category</th>
			</tr>
			<tr>
				<td>SwinCoin</td>
				<td>$92.00</td>
				<td>test desc</td>
				<td>Coin</td>
			</tr>
			<tr>
				<td>ConzoCoin</td>
				<td>$192.00</td>
				<td>test desc</td>
				<td>Coin</td>
			</tr>
			<tr>
				<td>DiamondPhoto</td>
				<td>$0.83</td>
				<td>test desc</td>
				<td>Photo?</td>
			</tr>
		</table>
	</div>
);
}

export default Market;