import API from "./api";

// Start a new game
export const startGame = async () => {
  const { data } = await API.post("/game/start");
  return data;
};

// Submit an answer
export const submitAnswer = async (gameId, answer) => {
  const { data } = await API.post("/game/answer", { gameId, answer });
  return data;
};

// Use a lifeline
export const callLifeline = async (gameId, type) => {
  const { data } = await API.post("/game/lifeline", { gameId, type });
  return data;
};

// Quit game
export const quitGame = async (gameId) => {
  const { data } = await API.post("/game/quit", { gameId });
  return data;
};


// services/gameService.js
export const getActiveGame = async () => {
  const { data } = await API.get("/game/active");
  return data;
};
