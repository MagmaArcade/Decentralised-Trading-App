// get navbar
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


// import images
import market from '../assets/Market.png';

// import the css syles
import "../css/Market.css";


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