const mongoose = require("mongoose");

const ChoiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  linkedOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Option",
    required: true,
  },
});

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  choices: [ChoiceSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Story", StorySchema);
