import API from "./api";

// 🎮 Start a new game or continue existing one
export const startGame = async (body) => {
  const { data } = await API.post("/game/start", body);
  return data;
};


// 🧠 Submit an answer for the current question
export const submitAnswer = async (gameId, answer) => {
  const { data } = await API.post("/game/answer", { gameId, answer });
  return data;
};

// 🔍 Get the user's active game
export const getActiveGame = async () => {
  const { data } = await API.get("/game/active");
  return data;
};
