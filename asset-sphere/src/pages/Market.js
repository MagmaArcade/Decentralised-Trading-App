// get navbar
import Navbar from "./Navbar";

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
				 <img 
				src={market}
				alt={"market"}
				align="center"
				style={{ width: 1000, height: 1000 }}/>

			</div>
		</div>
     </div>
);
}

export default App;