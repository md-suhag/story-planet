const ChoiceAnalytics = require("../models/analytices.model");

const storeChoice = async (req, res) => {
  const { storyId, choiceId, choiceTitle, userId } = req.body;
  try {
    await ChoiceAnalytics.create({
      storyId,
      choiceId,
      choiceTitle,
      userId,
      timestamp: new Date(),
    });
    res.status(200).send("Choice logged successfully");
  } catch (error) {
    res.status(500).send("Error logging choice");
  }
};

const getTotalOptionsChoice = async (req, res) => {
  const { storyId } = req.params;
  try {
    const analytics = await ChoiceAnalytics.aggregate([
      { $match: { storyId } },
      {
        $group: {
          _id: "$choiceId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "choiceanalytics",
          localField: "_id",
          foreignField: "choiceId",
          as: "choiceData",
        },
      },
      {
        $unwind: "$choiceData",
      },
      {
        $project: {
          _id: 1,
          count: 1,
          choiceTitle: "$choiceData.choiceTitle",
        },
      },
    ]);

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).send("Error fetching analytics");
  }
};

module.exports = {
  storeChoice,
  getTotalOptionsChoice,
};
