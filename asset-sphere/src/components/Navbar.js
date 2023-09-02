/*
Name:   Nathan Hoorbkaht
  	    Nicholas Gustin	
	    Connor Lack

SID:  	103865794
	    103995882
	    103992223
*/
// this is the Navbar component. this is used for page navigation.


// librarys
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

// images
import logo from '../assets/AssetSphere_Logo.png';
import profile from '../assets/Profile.png';

import "../css/Navbar.css"; // import css styling

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
					<Link to="/Home">
						<img
							src={logo}
							alt={"Home"}
							align="left"
							style={{ width: 200, height: 50 }}
						/>
					</Link>
				</item>
			</Grid>
			
			<Grid item xs={1.5} className="pagelinks">
				<item>
					<Link to="/Market" > Market </Link>
				</item>
			</Grid>
			
			<Grid item xs={1.5} className="pagelinks">
				<item>
					<Link to="/Dashboard"> Dashboard </Link>
				</item>		
			</Grid>
			
			<Grid item xs={1.5} className="pagelinks">
				<item>
					<Link to="/Wallet"> Wallet </Link>
				</item>
			</Grid>

			<Grid item xs={1.5} className="pagelinks">
				<item>
					<Link to="/Trade"> Trade </Link>
				</item>
			</Grid>
			
			<Grid item xs={2}>
				<item> 
					<Link to="/Login"> <img
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

/* glitchy as f, need to fix later, disabled for developement rn

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    document.getElementsByClassName("navbar")[0].style.padding = "10px 0";
  } else {
    document.getElementsByClassName("navbar")[0].style.padding = "30px 0";
  }
}

window.onscroll = function() {scrollFunction()}; */

export default Navbar; 

