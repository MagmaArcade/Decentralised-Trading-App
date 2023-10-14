/*
Name: 	Nathan Hoorbkaht
		    Nicholas Gustin	
	    	Connor Lack

SID:	  103865794
		    103995882
	    	103992223
*/
// this is the Login page. this page is used to access the user's account.

import { Link } from "react-router-dom"; // import link to route to other pages
import Coin from '../assets/CoinS.png'; // import images
import "../css/Login.css"; // import css styling
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from "@mui/material"; // import js elements from mui
import axios from 'axios'
import * as d3 from 'd3';
import "../css/Login.css"; // import css styling
import Validation from "../components/LoginValidation.js"; // import login validation styling

// Login application
function Login() {
  const [values, setValues] = useState({
    email: '', 
    password: ''
  })

  const [isFormValid, setIsFormValid] = useState(false);

  const[errors, setErrors] = useState ({})

  const handleInput = (event) => {
    setIsFormValid(false);
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }
  return (
    <div className="login">
      <div className="main-container">
        <div className="main-content">
          <h1>Log In</h1>
          <form className="login-form form-container" action="" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" name="email" onChange={handleInput}/>
            {errors.email && <span className='text-danger'> {errors.email}</span>}
            <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
            {errors.password && <span className='text-danger2'> {errors.password}</span>}
            <button type="submit" className="main-btn">
            {isFormValid ? <Link to="/Dashboard">Log In</Link> : "Log In"}</button>
            <p className="btn-undertext">
              Don't have an account? <Link to="/Register">Register here.</Link>
            </p>
          </form>
        </div>
        <div className="main-img-container">
          <div className="main-img-card"><img src={Coin} alt="Coin" /></div>
        </div>
      </div>
    </div>
  );
}
export default Login;
