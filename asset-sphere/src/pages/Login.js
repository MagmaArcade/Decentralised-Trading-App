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
import React, { useState } from 'react';
import axios from 'axios'
import "../css/Login.css"; // import css styling
import Validation from "../components/LoginValidation.js"; // import login validation styling
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";


// Login application
function Login() {
  const [values, setValues] = useState({
    email: '', 
    password: ''
  })

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({
      ...values, 
      [event.target.name]: event.target.value
    });
  }

  // Logic when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values); // Check the values pass validation
    setErrors(validationErrors); // Set errors if they don't

    if (Object.keys(validationErrors).every(key => validationErrors[key] === "")) { // Checks there are no entry validation errors
      
      // Now we send the entered email and password to the backend, checking if they exist in the database
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/validatelogin",
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          "email": values.email,
          "password": values.password
        }
      })
      .then((response) => {
        // If the email and password do exist, route the user to Wallet
        if(response.data.status == "success") {
          window.alert("Logged in!")
          navigate("/Home")
        }
        // If not, set the error as invalid email or password and keep them on the page
        else {
          setErrors(prev => ({ ...prev, password: "Invalid email or password" }))
        }
      })
    }
  }
    
  return (
    <div className="login">
      <Navbar/>
      <div className="main-container">
        <div className="main-content">
          <h1>Log In</h1>
          <form className="login-form form-container" action="" onSubmit={handleSubmit} >
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
export default Login;
