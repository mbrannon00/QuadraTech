import '../webpages/home.css';
import React from 'react';
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div id="landing">
                <h1>Welcome to Quadra Tech</h1>
                <Link to="/Login" > <button className="main-btn login-register">Login</button> </Link>
            </div>
        </div>
    )
}