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
import { useNavigate } from 'react-router-dom';

// Login application
function Login() {
  const [values, setValues] = useState({
    email: '', 
    password: ''
  })

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({
      ...values, 
      [event.target.name]: event.target.value
    });
    setIsFormValid(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).every(key => validationErrors[key] === "")) {        
        // Check login credentials with server here if needed, then:
        navigate('/Dashboard');
        setIsFormValid(true);
    } else {
        setIsFormValid(false);
    }

    setAuthToken(values.email); // sets the userId in api.py to be used in other functions
  }
  
  return (
    <div className="login">
      <div className="main-container">
        <div className="main-content">
          <h1>Log In</h1>
          <form className="login-form form-container" action="" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" name="email" onChange={handleInput} value={values.email}/>
            {errors.email && <span className='text-danger'> {errors.email}</span>}
            <input type="password" placeholder="Password" name="password" onChange={handleInput} value={values.password}/>
            {errors.password && <span className='text-danger2'> {errors.password}</span>}
            <button type="submit" className="main-btn"> Log In </button>
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


// Function to set the authentication token in the backend
function setAuthToken(email) {

	// String that calls the API to retrieve userID from the database
  const userId = (`http://127.0.0.1:8000/getuserid/${email}`)

  const requestBody = {
    auth_token: userId,
  };

  fetch('/api/set_auth_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(response => {
      if (response.ok) {
        console.log('Authentication token set successfully');
      } else {
        console.error('Failed to set authentication token');
      }
    })
    .catch(error => {
      console.error('Error while setting authentication token:', error);
    });
}
export default Login;
