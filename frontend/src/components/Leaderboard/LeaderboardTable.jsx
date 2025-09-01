import React from "react";
import "./LeaderboardTable.css";

const LeaderboardTable = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td data-label="Rank">{index + 1}</td>
              <td data-label="Player">{player.name}</td>
              <td data-label="Score">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
