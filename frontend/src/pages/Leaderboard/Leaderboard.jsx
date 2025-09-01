// src/pages/Leaderboard.js
import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../../services/leaderboardService";
import LeaderboardTable from "../../components/Leaderboard/LeaderboardTable";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaders(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <LeaderboardTable leaderboard={leaders} />
    </div>
  );
};

export default Leaderboard;
