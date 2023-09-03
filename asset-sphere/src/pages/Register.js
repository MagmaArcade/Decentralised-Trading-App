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
      <div className="main-reg-container">
        <div className="main-reg-content">
          <h1>Create Personal Account</h1>
          <form className="register-form form-reg-container"> {/* get all relevent user info for user account */}
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="datetime-local" placeholder="Date of Birth"/>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="main-reg-btn">
              <Link to="/Dashboard">Register</Link>
            </button>
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