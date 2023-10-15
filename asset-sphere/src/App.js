/*
Name:   Nathan Hoorbkaht
  	    Nicholas Gustin	
	      Connor Lack

SID:  	103865794
	      103995882
	      103992223
*/

// Import libraries
import React, { useState, useEffect } from 'react';
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
import Navbar from "./components/Navbar";

// Top level variable which controls functions that should only execute a single time on app load
// This includes deploying smart contracts and creating the original user who owns all assets
let didInit = false;


// App application
function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;

      axios.get('http://127.0.0.1:8000/deploysc/users')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error("Whoops, there was an error: ", error)
      })

      axios.get('http://127.0.0.1:8000/deploysc/transferassets')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error("Whoops, there was an error: ", error)
      })
    }
  }, []);

  return (
    <div className="app">
      <Navbar/> {/* used to add a navbar to all pages */}

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
