/*
Name:   Nathan Hoorbkaht
  	    Nicholas Gustin	
	    Connor Lack

SID:  	103865794
	    103995882
	    103992223
*/
// this is the Navbar component. this is used for page navigation.

import { Grid, Button } from "@mui/material"; // import js elements from mui
import { Link, useNavigate } from "react-router-dom"; // import link to route to other pages
import "../css/Navbar.css"; // import css styling
import React, { useState, useEffect } from "react"; // Added useState
import axios from "axios"; // Added axios
// images
import logo from '../assets/AssetSphere_Logo.png';
import profile from '../assets/Profile.png';


// Navbar application
function Navbar() {

	const [currentSessionToken, setCurrentSessionToken] = useState(""); 
	const [currentUserName, setCurrentUserName] = useState();

	useEffect(() => {
		// Gets the current Session ID (i.e. which user is logged in?)
		getCurrentSession();

	  }, [currentUserName, currentSessionToken]);
	
	// Calls the API to get the current Session Token (i.e. which user is logged in)
	function getCurrentSession() {
		axios.get('http://127.0.0.1:8000/currentsessiontoken/')
		.then(response => {
			// Maps the returned session token to the currentSessionToken variable
			setCurrentSessionToken(response.data.token);
		})
		.catch(error => {
			console.error("Whoops, there was an error: ", error);
		});
	}

	const renderLoginComponent = () => {
		if(currentSessionToken === "") {
			return (
				<item>
				<Link to="/Login">
					<img src={profile} alt={"Login"} align="right" className="login-icon" />
				</Link>
				</item>
			)
		}
		else {
			const query = (`http://127.0.0.1:8000/getusername/${currentSessionToken}`);
			axios.get(query)
			.then(response => {
				setCurrentUserName(response.data)
			})
			.catch(error => {
				console.error("Whoops, there was an error: ", error)
			})

			return (
			<div>
				<p>Logged in as: {currentUserName}</p>
				<Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
			</div>
			)
		}
	}

	const handleLogout = () => {
		axios.get('http://127.0.0.1:8000/sessioninitialiser')
			.catch(error => {
				console.error("Whoops, there was an error: ", error)
			})
		
		setCurrentSessionToken("")
	}


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
                {renderLoginComponent()}
            </Grid>
		</Grid>
    </div>
  );
}
export default Navbar; 

