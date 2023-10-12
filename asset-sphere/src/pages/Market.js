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
import axios from 'axios'
import * as d3 from 'd3';

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
				<th>Asset</th>
				<th>Name</th>
				<th>Price</th>
				<th>Change (24HR)</th>
				<th>Volume</th>
			</tr>
			<tr>
				<td>SwinCoin</td>
				<td>$92.00</td>
				<td className="up">0.25%</td>
				<td>100.00</td>
			</tr>
			<tr>
				<td>ConzoCoin</td>
				<td>$192.00</td>
				<td className="down">0.55%</td>
				<td>173.00</td>
			</tr>
			<tr>
				<td>DiamondCoin</td>
				<td>$0.83</td>
				<td className="up">50.0%</td>
				<td>1.00M</td>
			</tr>
			<tr>
				<td>NebulaCoin</td>
				<td>$2.58</td>
				<td className="up">9.0%</td>
				<td>1.31M</td>
			</tr>
			<tr>
				<td>Saturnium</td>
				<td>$250.00</td>
				<td className="up">0.34%</td>
				<td>820.00</td>
			</tr>
			<tr>
				<td>FusionX</td>
				<td>$0.01</td>
				<td className="down">9.12%</td>
				<td>90.00M</td>
			</tr>
			<tr>
				<td>BitGem</td>
				<td>$42,000.00</td>
				<td className="up">5.20%</td>
				<td>18.79M</td>
			</tr>
			<tr>
				<td>EtherSphere</td>
				<td>$3,500.00</td>
				<td className="up">8.75%</td>
				<td>117.64M</td>
			</tr>
			<tr>
				<td>RipperCoin</td>
				<td>$1.00</td>
				<td className="down">-2.50%</td>
				<td>55.71B</td>
			</tr>
			<tr>
				<td>LiteGem</td>
				<td>$150.00</td>
				<td className="up">3.80%</td>
				<td>66.31M</td>
			</tr>
			<tr>
				<td>CardanoSphere</td>
				<td>$2.50</td>
				<td className="up">6.25%</td>
				<td>32.03B</td>
			</tr>
			<tr>
				<td>LinkStar</td>
				<td>$25.00</td>
				<td className="down">-1.50%</td>
				<td>425.92M</td>
			</tr>
			<tr>
				<td>Stellium</td>
				<td>$0.50</td>
				<td className="up">4.00%</td>
				<td>22.36B</td>
			</tr>
			<tr>
				<td>PolkaGem</td>
				<td>$30.00</td>
				<td className="down">-0.80%</td>
				<td>1.02B</td>
			</tr>
			<tr>
				<td>CardanoSphere</td>
				<td>$2.50</td>
				<td className="up">6.25%</td>
				<td>32.03B</td>
			</tr>
		</table>
	</div>
);
}

export default Market;