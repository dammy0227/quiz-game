import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Play Game", path: "/game" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo" onClick={() => navigate("/")}>
          CyberQuest 🛡️
        </h1>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.name}
            </Link>
          ))}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
