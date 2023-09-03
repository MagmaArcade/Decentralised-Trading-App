/*
Name:   Nathan Hoorbkaht
  	    Nicholas Gustin	
	      Connor Lack

SID:  	103865794
	      103995882
	      103992223
*/

import React from 'react';
import "./App.css"; // import css styling
import { Grid, Box } from "@mui/material"; // import js elements from mui
import { Routes, Route } from "react-router-dom"; // import routes for page navigation

// import all relevent pages
import Home from "./pages/Home";
import Market from "./pages/Market";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trade from "./pages/Trade";
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

// App application
function App() {
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
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Wallet" element={<Wallet />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
		    <Route path="Trade" element={<Trade />} />
      </Routes>

      <Footer/> {/* used to add a footer to all pages */}
    </div>
  );
}


export default App;
