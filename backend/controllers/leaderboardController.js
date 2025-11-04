import Game from "../models/gameModel.js";
import User from "../models/userModel.js";

/**
 * Get leaderboard showing top 10 players by total score
 */
export const getLeaderboard = async (req, res) => {
  try {
    // Aggregate user scores from completed or active games
    const leaderboard = await Game.aggregate([
      {
        $group: {
          _id: "$user",
          totalScore: { $max: "$score" }, // use max or sum depending on design
          completedLevels: { $addToSet: "$completedLevels" },
        },
      },
      { $sort: { totalScore: -1 } },
      { $limit: 10 },
    ]);

    if (!leaderboard.length) return res.json([]);

    // Populate user details
    const populated = await User.populate(leaderboard, {
      path: "_id",
      select: "name email", // adjust fields as needed
    });

    // Format response
    const result = populated.map((item) => ({
      userId: item._id?._id || "Unknown",
      name: item._id?.name || "Anonymous User",
      email: item._id?.email || "",
      score: item.totalScore || 0,
      completedLevels: item.completedLevels.flat(),
    }));

    res.json(result);
  } catch (error) {
    console.error("Leaderboard error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
