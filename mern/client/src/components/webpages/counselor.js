import React from 'react';
import {Link} from "react-router-dom";
import Navbar from '../navbar.js';
import './counselor.css';
import persona1 from '../../components/imgs/persona1.png'
import persona2 from '../../components/imgs/persona2.png'
import persona3 from '../../components/imgs/persona3.png'
import persona4 from '../../components/imgs/persona4.png'

export default function Counselor() {
    return (
        <div>
            <Navbar/>
            <div id="counselor">
                <h2>Outside Counselors Accepting Occupants</h2>
                <div id="unit">
                    <img id="pic" src={persona1}/>
                    <div id="text">
                        <p>Name: Michael Johnson</p>
                        <p>Phone Number: 123-456-7890</p>
                        <p>Location: Orlando, FL</p>
                        <p id="link">Book an Appointment here.</p>
                    </div>
                </div>
                <div id="unit">
                    <img id="pic" src={persona3}/>
                    <div id="text">
                        <p>Name: Jennifer Smith</p>
                        <p>Phone Number: 123-456-7890</p>
                        <p>Location: Gainesville, FL</p>
                        <p id="link">Book an Appointment here.</p>
                    </div>
                </div>
                <div id="unit">
                    <img id="pic" src={persona2}/>
                    <div id="text">
                        <p>Name: Robert Dawson</p>
                        <p>Phone Number: 123-456-7890</p>
                        <p>Location: Orlando, FL</p>
                        <p id="link">Book an Appointment here.</p>
                    </div>
                </div>
                <div id="unit">
                    <img id="pic" src={persona4}/>
                    <div id="text">
                        <p>Name: Kate Robertson</p>
                        <p>Phone Number: 123-456-7890</p>
                        <p>Location: Orlando, FL</p>
                        <p id="link">Book an Appointment here.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}