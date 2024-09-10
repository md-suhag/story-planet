const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Option", OptionSchema);
