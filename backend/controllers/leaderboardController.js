import Game from "../models/gameModel.js";
import User from "../models/userModel.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Game.aggregate([
      { $match: { isOver: true } }, // only completed games
      { $group: { _id: "$user", maxPrize: { $max: "$earnings" } } }, // max prize per user
      { $sort: { maxPrize: -1 } },
      { $limit: 10 },
    ]);

    if (!leaderboard.length) return res.json([]);

    const populated = await User.populate(leaderboard, {
      path: "_id",
      select: "name",
    });

    const result = populated.map((item) => ({
      userId: item._id?._id || "Unknown",
      name: item._id?.name || "Unknown",
      score: item.maxPrize || 0,
    }));

    res.json(result);
  } catch (error) {
    console.error("Leaderboard error:", error.message); // <-- log error
    res.status(500).json({ message: error.message });
  }
};
