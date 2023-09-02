import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../components/Navbar";
import Coin from '../assets/CoinS.png';
import "../css/Login.css";

function Login() {
  return (
    <div className="Login">
      <div className="main__container">
        <div className="main__content">
          <h1>Log In</h1>
          <form className="login-form form__container">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="main__btn">
              <Link to="/Dashboard">Log In</Link>
            </button>
            <p className="btn__undertext">
              Don't have an account? <Link to="/Register">Register here.</Link>
            </p>
          </form>
        </div>
        <div className="main__img--container">
          <div className="main__img--card"><img src={Coin} alt="Coin" /></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
