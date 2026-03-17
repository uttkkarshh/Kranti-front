import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './Contexts/UserContext';
import Login from './Components/User/Login';
import Register from './Components/User/Register';

import HomePage from "./Components/Home/Home";
import LandingPage from "./Components/Landing/Landingpage";

function App() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage setUser={setUser} />} />
        <Route path="/login" element={<Login />} />
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
