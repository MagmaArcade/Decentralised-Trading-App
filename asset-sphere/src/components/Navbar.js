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

var currentSessionToken = "";    // Will initalise as blank, but this will be called before any checks: therefore, if a session token exists, it will be updated before any calls on this variable are run

// Navbar application
function Navbar() {

	/* Function needs to return different HTML/MUI depending on:
		if currentSessionToken == "", then return HTML which shows a login button and that button routes the user to the login page

		else: (AKA we have a current logged in user ID)
			we need an API call that gets the first name of that user
			return html which:
				shows text saying: "Logged in as: {fname}"
				next to that, a button which says logout 
				button on press will call "http://127.0.0.1/sessioninitialiser"
	*/

  return (
    <div className="navbar">
        <Grid 	
			direction="row"
			justifyContent="center"
			alignItems="center"
			container spacing={8}>

			<Grid item xs={6} sm={3}>
				<item> 
					<Link to="/Home"> {/* will route user to the home page */}
						<img
							src={logo}
							alt={"Home"}
							align="left"
							style={{ width: 200, height: 50 }}
							className="asset-sphere"
						/>
					</Link>
				</item>
			</Grid>
			
			<Grid item xs={1} sm={1} className="page-links">
				<item>
					<Link to="/Market" > Market </Link> {/* routes user to the market page */}
				</item>
			</Grid>
			
			<Grid item xs={1} sm={1} className="page-links">
				<item>
					<Link to="/Wallet"> Wallet </Link> {/* Wallet will eventually reroute to login if their is no user account */}
				</item>
			</Grid>

			<Grid item xs={1} sm={1} className="page-links">
				<item>
					<Link to="/Transfer"> Transfer </Link> {/* Transfer will eventually reroute to login if their is no user account */}
				</item>
			</Grid>
			
			<Grid item xs={1} sm={3}>
				{/* This to call a function which will return some HTML */}
				<item> 
					<Link to="/Login"> {/* will route user to the login page */}
						<img 
						src={profile}
						alt={"Login"}	
						align="right"
						style={{ width: 50, height: 50 }}
						className="login-icon"				
						/> 
					</Link>
				</item>
			</Grid>
		</Grid>
    </div>
  );
}
export default Navbar; 

