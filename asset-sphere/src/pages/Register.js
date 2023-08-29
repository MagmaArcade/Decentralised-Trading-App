
import Navbar from "./Navbar";

function App() {
  return (
     <div class="Register">
	      <Navbar></Navbar>
        <div className="main__container">
          <div className="main__content">
            <h1>Create Personal Account</h1>
            <form className="register-form form__container">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="datetime-local" placeholder="Date of Birth"/>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="Login.js" className="btn__undertext">Already have an account? Login here.</a>
            </form>
          </div>
        </div>
      </div>
);
}

export default App;