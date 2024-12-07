import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/User/Login';
import Register from './Components/User/Register';

import HomePage from "./Components/Home/Home";
import LandingPage from "./Components/Landing/Landingpage";

function App() {
 
  const [user,setUser]=React.useState(null);
  const handleLogin = (user) => {
    setUser(user);
     
    //setUserName(name);
  //  localStorage.setItem("user", user); // Store user ID in local storage
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");

  };
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage setUser={handleLogin} />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/register" element={<Register />} /> 
        <Route
          path="/home/*"
          element={user ? <HomePage userDet={user} onLogout={handleLogout} /> : <LandingPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
