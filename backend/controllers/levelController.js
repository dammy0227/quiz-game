import Level from "../models/levelModel.js";
import Game from "../models/gameModel.js";


export const getLevels = async (req, res) => {
  try {
    const userId = req.user._id;

    const levels = await Level.find().sort({ order: 1 });

    const userGame = await Game.findOne({ user: userId });
    const completedLevels = userGame?.completedLevels || [];

  
    const levelsWithStatus = levels.map((level, index) => {
      const isCompleted = completedLevels.includes(level.name);

  
      let unlocked = false;
      if (index === 0) unlocked = true; 
      else {
        const prevLevel = levels[index - 1];
        unlocked = completedLevels.includes(prevLevel.name) || isCompleted;
      }

      return {
        _id: level._id,
        name: level.name,
        label: level.label,
        description: level.description,
        order: level.order,
        totalQuestions: level.totalQuestions,
        rewardPoints: level.rewardPoints,
        unlocked,
        completed: isCompleted,
      };
    });

    res.status(200).json(levelsWithStatus);
  } catch (error) {
    console.error("❌ Error fetching levels:", error.message);
    res.status(500).json({
      message: "Error fetching levels",
      error: error.message,
    });
  }
};


export const seedLevels = async (req, res) => {
  try {
    const defaultLevels = [
      {
        name: "easy",
        label: "Easy",
        description: "Start your journey identifying simple cyber threats.",
        order: 1,
        totalQuestions: 10,
        rewardPoints: 50,
      },
      {
        name: "intermediate",
        label: "Intermediate",
        description: "Test your skills with realistic phishing challenges.",
        order: 2,
        totalQuestions: 10,
        rewardPoints: 100,
      },
      {
        name: "hard",
        label: "Hard",
        description: "Defend against the most advanced social engineering attacks.",
        order: 3,
        totalQuestions: 10,
        rewardPoints: 200,
      },
    ];


    await Level.deleteMany();
    const inserted = await Level.insertMany(defaultLevels);

    res.status(201).json({
      message: "✅ Levels successfully seeded.",
      levels: inserted,
    });
  } catch (error) {
    console.error("❌ Error seeding levels:", error.message);
    res.status(500).json({
      message: "Error seeding levels",
      error: error.message,
    });
  }
};
