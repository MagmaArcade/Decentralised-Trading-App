/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:  	103865794
	  	  103995882
		    103992223
*/
// this is the Register page. this page is used get a new user info.

import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/Register.css"; // import css styling


function Register() {
  return (
    <div class="Register">
      <div className="mainreg__container">
        <div className="mainreg__content">
          <h1>Create Personal Account</h1>
          <form className="register-form formreg__container">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="datetime-local" placeholder="Date of Birth"/>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="mainreg__btn">
              <Link to="/Dashboard">Register</Link>
            </button>
            <p className="btn__undertext">
              Already have an account? <Link to="/Login">Login here.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
);
}

export default Register;