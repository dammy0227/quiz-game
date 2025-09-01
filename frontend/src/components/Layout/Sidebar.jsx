import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Play Game", path: "/game" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" }, // handled specially
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    navigate("/login"); // redirect to login
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={
              location.pathname === item.path ? "active sidebar-item" : "sidebar-item"
            }
          >
            {item.name === "Logout" ? (
              <button
                onClick={handleLogout}
                className="sidebar-link-button"
              >
                {item.name}
              </button>
            ) : (
              <Link to={item.path}>{item.name}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
