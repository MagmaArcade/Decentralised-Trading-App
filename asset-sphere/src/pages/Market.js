/*
Name: 	Nathan Hoorbkaht
		Nicholas Gustin	
		Connor Lack

SID:	103865794
		103995882
		103992223
*/
// this is the Market page. this page is used view all available coins within the market.

import { Grid, TextField } from "@mui/material"; // import js elements from mui
import "../css/Market.css"; // import the css syles

// Market application
function Market() {
  return (
	<div className="market">
		<div className="search">
			<Grid
				direction="row"
				justifyContent="right"
				alignItems="right"
				container spacing={2}>

				<Grid item xs={4}><noscript>This is a spacer for the grid</noscript></Grid>  {/* space add an empty grid element that consume the empty grid spaces */}

				<Grid item xs={2}>
				<item> 
					<TextField color="success" sx={{ backgroundColor: '#3b3b3b'}} focused /> {/* search bar, will post info to table to get desired search */}
				</item>
				</Grid>

				<Grid item xs={2}>
				<item> 
					<button className="search-btn">Search</button>
				</item>
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