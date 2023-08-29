import Navbar from "./Navbar";

import { Grid } from "@mui/material";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";


//import { createTheme, ThemeProvider } from '@mui/material/styles';



// images
import stock1 from '../assets/1.jpg';
import coin from '../assets/Coin.png';
import handshake from '../assets/Handshake.png';
import sold from '../assets/Sold.png';

// css
import "../css/Home.css";



function App() {
  return (
	<div >
	<Navbar style={{ border: 0 }}></Navbar>
	 
	<div className="Home">
		<div>
			<h2> Trade With Ease... </h2>
			
			<Grid 
				direction="row"
				justifyContent="center"
				alignItems="center"
				container rowSpacing={1}>

				<Grid item xs={5}>
					<item> 
						<p id="speil">
							Discover Asset Sphere – Your Destination for Cryptocurrency Trading.
							Dive into the dynamic world of digital assets with our
							beginner-friendly platform. Whether you’re buying, trading, or
							selling, we’ve got you covered. Explore a range of cryptocurrencies,
							access valuable resources, and connect with a community of like-minded
							traders. Start your crypto journey with Asset Sphere today.
						</p>
					</item>
				</Grid>
			</Grid>
		</div>
		
		<div>
			<Grid 
				direction="row"
				justifyContent="center"
				alignItems="center"
				container rowSpacing={1}>

				<Grid item xs={2}>
					<item className="main__btn">
						<Link to="/Login">
							<Button type="submit"> Login </Button>
						</Link>
					</item>
				</Grid>
				<Grid item xs={2}>
					<item className="main__btn">
						<Link to="/Register">
							<Button type="submit"> Register </Button>
						</Link>
					</item>
				</Grid>
			</Grid>
		</div>
	  
	</div>
	
	<div className="footer" >
		<div>
			<Grid 
				direction="row"
				justifyContent="center"
				alignItems="center"
				container rowSpacing={1}>

				<Grid item xs={3}>
					<item> 
						<h1>Buy</h1>
					</item>
				</Grid>
				<Grid item xs={3}>
					<item> 
						<h1>Sell</h1>
					</item>
				</Grid>
				<Grid item xs={3}>
					<item> 
						<h1>Trade</h1>
					</item>
				</Grid>
			</Grid>
		</div>
		  
		<div>
		  <img 
			src={coin}
			alt={"coin"}
			align="left"
			style={{ width: 200, height: 200, paddingLeft: 200 }}/>
		  <img 
			src={handshake}
			alt={"coin"}
			//align=""
			style={{ width: 200, height: 200 }}/>
		  <img 
			src={sold}
			alt={"coin"}
			align="right"
			style={{ width: 200, height: 200, paddingRight: 200 }}/>
		</div>

		<div>
			<Grid 
				direction="row"
				justifyContent="center"
				alignItems="center"
				container rowSpacing={1}>

				<Grid item xs={3}>
					<item> 
						<p>Buy crypto with ease.</p>
					</item>
				</Grid>
				<Grid item xs={3}>
					<item> 
						<p>Trade with different coins</p>
					</item>
				</Grid>
				<Grid item xs={3}>
					<item> 
						<p>Sell with the click of a button</p>
					</item>
				</Grid>
			</Grid>
		</div>
	</div>
</div>
);
}

export default App;