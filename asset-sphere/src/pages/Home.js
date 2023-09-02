import Navbar from "../components/Navbar";

import { Grid } from "@mui/material";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

// images
import coin from '../assets/Coin.png';
import handshake from '../assets/Handshake.png';
import sold from '../assets/Sold.png';

// css
import "../css/Home.css";

// Home application
function App() {
  	return (
	<div >
		<Navbar></Navbar>
		
		<div className="Home">
			<div>
				<h2> Trade With Ease... </h2>
				
				<Grid
					direction="row"
					justifyContent="center"
					alignItems="center"
					container spacing={2}>
					
					<Grid item xs={3}><noscript>This is a spacer for the grid</noscript></Grid>
					<Grid item xs={6}>
						<item> 
							<p>
								Discover Asset Sphere – Your Destination for Cryptocurrency Trading.
								Dive into the dynamic world of digital assets with our
								beginner-friendly platform. Whether you’re buying, trading, or
								selling, we’ve got you covered. Explore a range of cryptocurrencies,
								access valuable resources, and connect with a community of like-minded
								traders. Start your crypto journey with Asset Sphere today.
							</p>
						</item>
					</Grid>
					<Grid item xs={3}><noscript>This is a spacer for the grid</noscript></Grid>


					<Grid item xs={4}><noscript>This is a spacer for the grid</noscript></Grid>
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
					<Grid item xs={4}><noscript>This is a spacer for the grid</noscript></Grid>
				
				</Grid>
			</div>
		
		</div>
		
		<div className="sizzler">
			<div>
				<Grid 
					direction="row"
					justifyContent="center"
					alignItems="center"
					container spacing={3}>

					<Grid item xs={4}>
						<item> 
							<h1>Buy</h1>
						</item>
					</Grid>
					<Grid item xs={4}>
						<item> 
							<h1>Sell</h1>
						</item>
					</Grid>
					<Grid item xs={4}>
						<item> 
							<h1>Trade</h1>
						</item>
					</Grid>


					<Grid item xs={4}>
						<item> 
							<img 
							src={coin}
							alt={"coin"}
							style={{ width: 200, height: 200}}/>
						</item>
					</Grid>
					<Grid item xs={4}>
						<item> 
							<img 
							src={handshake}
							alt={"handshake"}
							style={{ width: 200, height: 200}}/>
						</item>
					</Grid>
					<Grid item xs={4}>
						<item> 
							<img 
							src={sold}
							alt={"sold"}
							style={{ width: 200, height: 200}}/>
						</item>
					</Grid>


					<Grid item xs={4}>
						<item> 
							<p>Buy crypto with ease.</p>
						</item>
					</Grid>
					<Grid item xs={4}>
						<item> 
							<p>Trade with different coins</p>
						</item>
					</Grid>
					<Grid item xs={4}>
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