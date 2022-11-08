import '../webpages/home.css';
import React from 'react'
import {Link} from "react-router-dom";
import Navbar from '../navbar.js';

export default function Home() {
    return (
        <div>
            <Navbar />
            <div id="home">
                <h1>Welcome to Quadra Tech</h1>
                <Link to="/Login" > <button className="main-btn login-register">Login</button> </Link>
                <Link to="/Add" > <button className="main-btn new-occ">Add New Occupant</button></Link>
                <Link to="/Occupants"> <button className="main-btn records">See Existing Occupants</button></Link>
            </div>
        </div>
    )
}