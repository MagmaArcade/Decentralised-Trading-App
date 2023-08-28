import React from 'react';
import { makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";


import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Index";
import Market from "./Pages/Market";
import Dashboard from "./Pages/Dashboard";
import Wallet from "./Pages/Wallet";
import Login from "./Pages/Login";

import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Grid xs={12}>
        <Box
          sx={{
            marginTop: "54px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NavBar></NavBar>
        </Box>
      </Grid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Market" element={<Market />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Wallet" element={<Wallet />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
