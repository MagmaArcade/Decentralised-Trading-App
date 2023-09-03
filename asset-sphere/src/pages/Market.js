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
					<button className="search_btn">Search</button>
				</item>
				</Grid>
			</Grid>
		</div>

		<table>  {/* in this table element, all avaliable assets will be displayed */}
			<tr>
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