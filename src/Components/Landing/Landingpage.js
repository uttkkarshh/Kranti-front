import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Login from "../User/Login";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="Image" />
      <div className="Head">
        <h1>Kranti</h1>
        <p>तुम ही कल के हो शिवाजी, तुम ही कल के हो सिकंदर !</p>
        <div className="landing-buttons">
          {/* embed shared Login component */}
          <Login />
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
