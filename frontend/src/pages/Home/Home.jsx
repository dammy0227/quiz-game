import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login"); // go to login page
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <div className="icon">🛡️</div>
        <h1>Cybersecurity Awareness Game</h1>
        <p>Learn, Play, and Stay Safe Online</p>
        <button className="start-btn" onClick={handleStart}>
          🚀 Start
        </button>
      </div>
    </div>
  );
};

export default Home;
