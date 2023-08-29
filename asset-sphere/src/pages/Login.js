import Navbar from "./Navbar";
import Coin from '../assets/CoinS.png';

import "../css/Login.css";

function Login() {
  return (
    <div className="Login">
      <Navbar />
      <div className="main__container">
        <div className="main__content">
          <h1>Log In</h1>
          <form className="login-form form__container">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="main__btn">Log In</button>
            <a href="Register" className="btn__undertext">Don't have an account? Register here.</a>
          </form>
        </div>

        <div className="main__img--container">
          <div className="main__img--card"><img src = {Coin}/></div>
        </div>
      </div>
    </div>
  );
}

export default Login;