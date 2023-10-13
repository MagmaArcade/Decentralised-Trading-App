/*
Name: 	Nathan Hoorbkaht
		    Nicholas Gustin	
	    	Connor Lack

SID:	  103865794
		    103995882
	    	103992223
*/
// this is the Login page. this page is used to access the user's account.

import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/Register.css"; // import the css syles
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from "@mui/material"; // import js elements from mui
import axios from 'axios'
import * as d3 from 'd3';
import Validation from "./RegisterValidation";

// Register application
function Register() {

  const [values, setValues] = useState({
    fname: '',
    lname: '',
    dob: '',
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
    <div class="register">
      <div className="main-reg-container">
        <div className="main-reg-content">
          <h1>Create Personal Account</h1>
          <form className="register-form form-reg-container" onSubmit={handleSubmit}> {/* get all relevent user info for user account */}
            <input type="text" placeholder="First Name" name='fname' onChange={handleInput}/>
            {errors.fname && <span className='regtext-danger4'> {errors.fname}</span>}
            <input type="text" placeholder="Last Name" name='lname' onChange={handleInput}/>
            {errors.lname && <span className='regtext-danger3'> {errors.lname}</span>}
            <input type="date" placeholder="Date of Birth" name='dob' onChange={handleInput}/>
            {errors.dob && <span className='regtext-danger5'> {errors.dob}</span>}
            <input type="email" placeholder="Email" name='email' onChange={handleInput}/>
            {errors.email && <span className='regtext-danger'> {errors.email}</span>}
            <input type="password" placeholder="Password" name='password' onChange={handleInput}/>
            {errors.password && <span className='regtext-danger2'> {errors.password}</span>}
            <button type="submit" className="main-reg-btn">
            {isFormValid ? <Link to="/Dashboard">Sign Up</Link> : "Sign Up"}</button>
            <p className="btn-undertext">
              Already have an account? <Link to="/Login">Login here.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
);
}

export default Register;