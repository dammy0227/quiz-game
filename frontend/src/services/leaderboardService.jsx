// src/services/leaderboardService.js
import API from "./api";

export const getLeaderboard = async () => {
  const { data } = await API.get("/leaderboard");
  return data;
};
