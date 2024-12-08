import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { useState } from "react";
import {login } from "../../Services/userService"
import { saveToken } from "../../Utils/auth"; // Save JWT token

const LandingPage = ({setUser}) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      saveToken(response.data.token); // Save JWT to localStorage or cookies
     setUser(response.data.user);
     localStorage.setItem("user",JSON.stringify(response.data.user))
     
      setError(""); // Clear errors
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };
  return (
    <div className="landing-page">
      <div className="Image">
      </div>
      <div className="Head">
       <h1>Kranti </h1>
       <p>
       तुम ही कल के हो शिवाजी, तुम ही कल के हो सिकंदर !</p>
      <div className="landing-buttons">
    
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form className ="formdiv"onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <button onClick={() => handleNavigation("/register")}>Register</button>
      </form>
  
      
        
      </div>
      
      </div>
    </div>
  );
};

export default LandingPage;
