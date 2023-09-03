/*
Name: 	Nathan Hoorbkaht
		Nicholas Gustin	
	    Connor Lack

SID:	103865794
		103995882
	    103992223
*/
// this is the Login page. this page is used to access the user's account.

import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

// images
import coin from '../assets/Coin.png';
import handshake from '../assets/Handshake.png';
import sold from '../assets/Sold.png';

// css
import "../css/Home.css";

// Home application
function Home() {
  	return (
	<div>
		<div className="top">
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
								Discover AssetSphere – Your Destination for Assset Trading.
								Enter into the world of digital assets with our
								beginner-friendly platform. Explore a range of available assets and connect with a community of like-minded
								traders. Start your trading journey with AssetSphere today.
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
		
		<div className="bottom">
			<div>
				<Grid 
					direction="row"
					justifyContent="center"
					alignItems="center"
					container spacing={3}>

					<Grid item xs={4}>
						<item> 
							<h1 className="bottomHeader">Buy</h1>
						</item>
					</Grid>
					<Grid item xs={4}>
						<item> 
							<h1 className="bottomHeader">Sell</h1>
						</item>
					</Grid>
					<Grid item xs={4}>
						<item> 
							<h1 className="bottomHeader">Trade</h1>
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

export default Home;