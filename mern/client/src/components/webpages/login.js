import '../webpages/login.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../navbar.js';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

const Login= ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("auth-token", data.token);
      console.log(localStorage.getItem("auth-token"));

      alert('Login successful')
			window.location.href = '/Home'
    } catch (error) {
      alert('Login unsuccessful')
      window.location.href ='/'
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
    return (
      <div>
          <Navbar/>
        <div className="background-gradient" id="loginNow">
           <div className="wrapper">
      <div className="title">Login Form</div>
      <form onSubmit={loginHandler}>
        <div className="field">
          <input type="text" required
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
          <label>Email</label>
        </div>
        <div className="field">
          <input type="password" required 
          value={password}
					onChange={(e) => setPassword(e.target.value)}/>
          <label>Password</label>
        </div>
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" id="remember-me"></input>
            <label for="remember-me">Remember me</label>
          </div>
          <div className="pass-link"><Link to="/ForgotPassword">Forgot password?</Link></div>
        </div>
        <div className="field">
    <input type="Submit" value="Login"></input>
  </div>
        <div className="signup-link"><Link to="/Register">Not a member?</Link>
        </div>
      </form>
    </div>
            </div>
            </div>
    )
     
  }

  export default Login;