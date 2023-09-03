/*
Name:   Nathan Hoorbkaht
  	    Nicholas Gustin	
	    Connor Lack

SID:  	103865794
	    103995882
	    103992223
*/
// this is the Navbar component. this is used for page navigation.

import { Grid } from "@mui/material"; // import js elements from mui
import { Link } from "react-router-dom"; // import link to route to other pages
import "../css/Navbar.css"; // import css styling

// images
import logo from '../assets/AssetSphere_Logo.png';
import profile from '../assets/Profile.png';

// Navbar application
function Navbar() {
  return (
    <div className="navbar">
        <Grid 
			direction="row"
			justifyContent="center"
			alignItems="center"
			container spacing={3}>

			<Grid item xs={2}>
				<item> 
					<Link to="/Home"> {/* will route user to the home page */}
						<img
							src={logo}
							alt={"Home"}
							align="left"
							style={{ width: 200, height: 50 }}
						/>
					</Link>
				</item>
			</Grid>
			
			<Grid item xs={1.5} className="page-links">
				<item>
					<Link to="/Market" > Market </Link> {/* routes user to the market page */}
				</item>
			</Grid>
			
			<Grid item xs={1.5} className="page-links">
				<item>
					<Link to="/Dashboard"> Dashboard </Link> {/* Dashboard will eventually reroute to login if their is no user account */}
				</item>		
			</Grid>
			
			<Grid item xs={1.5} className="page-links">
				<item>
					<Link to="/Wallet"> Wallet </Link> {/* Wallet will eventually reroute to login if their is no user account */}
				</item>
			</Grid>

			<Grid item xs={1.5} className="page-links">
				<item>
					<Link to="/Trade"> Trade </Link> {/* Trade will eventually reroute to login if their is no user account */}
				</item>
			</Grid>
			
			<Grid item xs={2}>
				<item> 
					<Link to="/Login"> {/* will route user to the login page */}
						<img 
						src={profile}
						alt={"Login"}	
						align="right"
						style={{ width: 50, height: 50 }}				
						/> 
					</Link>
				</item>
			</Grid>
		</Grid>
    </div>
  );
}

/* 	This JS function implements a responsive navbar that shrinks as the user scrolls down the page
	Currently, it is glitching as the user scrolls, creating a very negative experience.
	This will be fixed in time for the dynamic release of the application.

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    document.getElementsByClassName("navbar")[0].style.padding = "10px 0";
  } else {
    document.getElementsByClassName("navbar")[0].style.padding = "30px 0";
  }
}

window.onscroll = function() {scrollFunction()}; */

export default Navbar; 

