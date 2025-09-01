import Game from "../models/gameModel.js";

// @desc Get user profile
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// @desc Get game history for logged-in user
export const getHistory = async (req, res) => {
  try {
    const games = await Game.find({ user: req.user.id });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
