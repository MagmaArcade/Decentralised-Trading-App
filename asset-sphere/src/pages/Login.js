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

// Login application
function Login() {
  return (
    <div className="login">
      <div className="main-container">
        <div className="main-content">
          <h1>Log In</h1>
          <form className="login-form form-container">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="main-btn">
              <Link to="/Dashboard">Log In</Link> {/* when login is validated, push to dashboard page */}	
            </button>
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
