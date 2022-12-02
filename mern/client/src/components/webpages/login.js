import '../webpages/login.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../navbar.js';
import { Navigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({});

  const[loggedIn, setLoggedIn] = useState(false);

  function login() {
    console.log("logged in");
    setLoggedIn(true);
    return <Navigate to="/LoggedInScreen" />;
  }

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    document.getElementById("signInDiv").hidden = true;
    login();
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "134714984207-tt7re6jjvblakkftihp0vha2u13fs7us.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );
  }, []);

  return( 
    <div>
      <div id="signInDiv">
        {
          loggedIn && (
            <Navigate to="/LoggedInScreen" />
            )
        }
        {user && 
          <div>
          <Link to="/Add" > <button className="main-btn new-occ">Add New Occupant</button></Link>
          <Link to="/Occupants"> <button className="main-btn records">See Existing Occupants</button></Link>
          </div>
        }
      </div>
    </div>
  )
}
