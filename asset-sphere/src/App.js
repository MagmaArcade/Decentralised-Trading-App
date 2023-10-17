/*
Name:   Nathan Hoorbkaht
  	    Nicholas Gustin	
	      Connor Lack

SID:  	103865794
	      103995882
	      103992223
*/

// Import libraries
import React, { useEffect } from 'react';
import "./App.css"; // import css styling
import { Grid, Box } from "@mui/material"; // import js elements from mui
import { Routes, Route } from "react-router-dom"; // import routes for page navigation
import axios from 'axios'


// import all relevent pages
import Home from "./pages/Home";
import Market from "./pages/Market";
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transfer from "./pages/Transfer";
import Footer from "./components/Footer";

// Top level variable which controls functions that should only execute a single time on app load
// This includes deploying smart contracts and initialising an empty session
let didInit = false;


// App application
function App() {
  useEffect(() => {
    // Anything inside this if statement will only execute once upon loading the app
    if (!didInit) {
      didInit = true;

      // Call session initialiser to create the session file and set it to ""
      axios.get('http://127.0.0.1:8000/sessioninitialiser')
			.catch(error => {
          // Check that the server is reachable on app startup. If not, send a prompt to the user requesting to check the server
          if (error.code === "ERR_NETWORK") {  
            window.alert("We have detected that the backend server was not available when this app started up. Critical functions or features of the website will not work unless the server exists before the app is started. Please check your server and restart the app.")
          }
          else {
            console.log()
          }
			})
      
      // Call the smart contract deployer
      axios.get('http://127.0.0.1:8000/deploymainsc')
        .catch(error => {
          console.log(error)
      })
    }

  }, []);

  return (
    <div className="app">
      {/*<Navbar/> {/* used to add a navbar to all pages */}

      <Grid xs={12}>
        <Box
          sx={{
            marginTop: "0",
            display: "flex",
            justifyContent: "center",
          }}>
        </Box>
      </Grid>

      <Routes> {/* provides links to all pages */}
        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Market" element={<Market />} />
        <Route path="Wallet" element={<Wallet />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
		    <Route path="Transfer" element={<Transfer />} />
      </Routes>

      <Footer/> {/* used to add a footer to all pages */}
    </div>
  );
}


export default App;
