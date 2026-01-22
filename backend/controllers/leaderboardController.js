import Game from "../models/gameModel.js";
import User from "../models/userModel.js";


export const getLeaderboard = async (req, res) => {
  try {

    const leaderboard = await Game.aggregate([
      {
        $group: {
          _id: "$user",
          totalScore: { $max: "$score" }, 
          completedLevels: { $addToSet: "$completedLevels" },
        },
      },
      { $sort: { totalScore: -1 } },
      { $limit: 10 },
    ]);

    if (!leaderboard.length) return res.json([]);

  
    const populated = await User.populate(leaderboard, {
      path: "_id",
      select: "name email", 
    });


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
