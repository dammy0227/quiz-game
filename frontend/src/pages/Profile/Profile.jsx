import React, { useEffect, useState } from "react";
import { getProfile, getHistory } from "../../services/userService";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfile(data);
    };

    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
    };

    fetchProfile();
    fetchHistory();
  }, []);

  return (
    <div className="profile-page">
      <h2>{profile.name}'s Profile</h2>
      <p>Email: {profile.email}</p>

      <h3>Game History</h3>
      <ul className="history-list">
        {history.map((game, index) => (
          <li key={index} className="history-item">
            <span>Game {index + 1}: ${game.prize}</span>
            <span className={`status ${game.isActive ? "in-progress" : "finished"}`}>
              {game.isActive ? "In Progress" : "Finished"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
