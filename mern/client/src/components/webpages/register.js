import React, { Component } from 'react';
import { useState, useEffect } from "react";
import './register.css';
import { Link } from 'react-router-dom';
import Navbar from '../navbar.js';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

const Register = ({history}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
  
    const registerHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      if (password !== confirmpassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Passwords do not match");
      }
  
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username,
            email,
            password,
          },
          config
        );
  
        localStorage.setItem("authToken", data.token);
        alert('Registration successful')
              window.location.href = '/Login'
  
        history.push("/");
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
      return (
        <div>
        <Navbar/>
            <div id="registration">
            <div className="wrapper">
            <h2>Registration</h2>
            <form onSubmit={registerHandler}>
            {error && <span className="error-message">{error}</span>}
  
                <div className="input-box">
                <input type="text" 
                placeholder="Enter Username" required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ></input>
                </div>
                <div className="input-box">
                <input type="text" 
                placeholder="Enter Your Email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
                </div>
                <div className="input-box">
                <input type="password" 
                placeholder="Create Password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>
                </div>
                <div className="input-box">
                <input type="password" 
                placeholder="Confirm Password" required
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                </div>
                <div className="input-box button">
                <input type="Submit" value="Register Now"></input>
                </div>
                <div className="text">
                <h3>Already have an account? 
                <Link to="/Login"> Login now</Link></h3>
                </div>
            </form>
            </div>
            </div>
        </div>
      )
    }
  
  
  export default Register;