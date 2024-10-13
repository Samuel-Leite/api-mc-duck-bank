import React from "react";
import "../styles/HomePage.css";
import mcduckLogo from "../assets/images/mcduck-logo-2.png";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="maintenance-emoji">🚧</div>
      <h1>Home Page Under Construction</h1>
      <p>We are working to improve your experience. Please check back soon!</p>
      <img src={mcduckLogo} alt="Bank Logo" className="logo" />
    </div>
  );
};

export default HomePage;
