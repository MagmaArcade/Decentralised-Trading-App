/*
Name: 	Nathan Hoorbkaht
		Nicholas Gustin	
		Connor Lack

SID:	103865794
		103995882
		103992223
*/
// this is the Market page. this page is used view all available coins within the market.


import "../css/Market.css"; // import the css syles

function Market() {
  return (
	<div className="Market">
		<table>
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
		</table>
	</div>
);
}

export default Market;