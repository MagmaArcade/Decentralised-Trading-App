import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../components/Navbar";
import "../css/Register.css";

function App() {
  return (
     <div class="Register">
	      <Navbar></Navbar>
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

export default App;