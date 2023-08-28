import React from 'react';
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";


import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Market from "./pages/Market";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";


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