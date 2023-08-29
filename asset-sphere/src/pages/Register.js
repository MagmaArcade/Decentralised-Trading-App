
import Navbar from "./Navbar";
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
              <button type="submit" className="mainreg__btn">Register</button>
              <a href="Login" className="btnreg__undertext">Already have an account? Login here.</a>
            </form>
          </div>
        </div>
      </div>
);
}

export default App;