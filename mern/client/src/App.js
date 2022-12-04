import React from "react";

// We use Route in order to define the different routes of our application
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios'
import { createContext, useState, useEffect } from 'react'


// We import all the components we need in our app
import Home from "./components/webpages/home"
import Login from "./components/webpages/login"
import LoggedInScreen from "./components/webpages/loggedInScreen"
import Register from "./components/webpages/register.js"
import Create from "./components/create.js"
import OccupantList from "./components/occupantList.js"
import Edit from "./components/edit.js"
import Counselor from "./components/webpages/counselor.js"

export const UserContext = createContext()

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token == null){
        localStorage.setItem("auth-token", "")
        token = ""
      }

      const tokenResponse = await axios.post(
        'http://localhost:5000/api/auth/tokenIsValid', 
        null, 
        {headers: {"auth-token": token}}
      )

      console.log(tokenResponse.data)
      if(tokenResponse.data){
        const userResponse = await axios.get('http://localhost:5000/api/auth/profile',
          {headers: {'auth-token': token}}
        )
        setUserData({
          token: token,
          user: userResponse.data
        })
      }
    }
    isLoggedIn()
  }, [])
  
  return (
    <div> 
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router> {/* Router lets page render different components based on address path */}
          
        <Routes> {/* Routes contained  for router  */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/LoggedInScreen" element={<LoggedInScreen/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Add" element={<Create />} />
          <Route path="/Occupants" element={<OccupantList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/Counselor" element={<Counselor />} />
        </Routes>

      </Router>  
    
      </UserContext.Provider>
    </div>

   );
}

export default App;