import Navbar from "./Navbar";
import "../css/Login.css";

function Login() {
  return (
    <div class="Login"> {/* Use 'div' instead of 'body' */}
      <Navbar />
      <div class="main__container">
        <div class="main__img--container">
          <div class="main__img--card"><i></i></div>
        </div>
        <div class="main__content"></div>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <p>paragraph paragraph paragraph paragraph paragraph</p>
      </div>
    </div>
  );
}

export default Login;
