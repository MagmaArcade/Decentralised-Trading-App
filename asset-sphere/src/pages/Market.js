/*
Name: 	Nathan Hoorbkaht
		Nicholas Gustin	
		Connor Lack

SID:	103865794
		103995882
		103992223
*/
// this is the Market page. this page is used view all available coins within the market.

import { Link } from "react-router-dom";// Import Link from react-router-dom
import market from '../assets/Market.png'; // import images
import "../css/Market.css"; // import the css syles

function Market() {
  return (
	<div>
	<div className="Market">
		<p> Market </p>
		
		<Link to="/Trade"> 
			<img 
				id="imgStyle"
				src={market}
				alt={"market"}
				align="center"
				style={{ width: 1000, height: 1000 }}/>
		</Link>
	</div>
	</div>
);
}

export default Market;