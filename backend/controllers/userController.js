import Game from "../models/gameModel.js";

export const getProfile = async (req, res) => {
  res.json(req.user);
};


export const getHistory = async (req, res) => {
  try {
    const games = await Game.find({ user: req.user._id });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
