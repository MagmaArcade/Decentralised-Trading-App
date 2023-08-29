// get navbar
import Navbar from "./Navbar";
import { Link } from "react-router-dom";


// import images
import market from '../assets/Market.png';

// import the css syles
import "../css/Market.css";


function App() {
  return (
     <div>
		<div>
			<Navbar></Navbar>
		</div>
		
		<div className="NavBorder">
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
     </div>
);
}

export default App;