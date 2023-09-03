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

// Register application
function Register() {
  return (
    <div class="register">
      <div className="main_reg_container">
        <div className="main_reg_content">
          <h1>Create Personal Account</h1>
          <form className="register_form form_reg_container">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="datetime-local" placeholder="Date of Birth"/>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="main_reg_btn">
              <Link to="/Dashboard">Register</Link>
            </button>
            <p className="btn_undertext">
              Already have an account? <Link to="/Login">Login here.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
);
}

export default Register;