const { default: mongoose } = require("mongoose");

const choiceAnalyticsSchema = new mongoose.Schema({
  storyId: String,
  choiceId: String,
  choiceTitle: String,
  userId: String,
  timestamp: Date,
});

module.exports = mongoose.model("ChoiceAnalytics", choiceAnalyticsSchema);
