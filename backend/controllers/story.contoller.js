const Option = require("../models/option.model");
const Story = require("../models/story.model");
const ChoiceAnalytics = require("../models/analytices.model");
const createStory = async (req, res) => {
  const { title, description, choices } = req.body;

  try {
    const option1 = new Option({ content: choices[0].optionContent });
    const option2 = new Option({ content: choices[1].optionContent });

    await option1.save();
    await option2.save();

    const story = new Story({
      title,
      description,
      author: req.user.id,
      choices: [
        {
          title: choices[0].title,
          linkedOption: option1._id,
        },
        {
          title: choices[1].title,
          linkedOption: option2._id,
        },
      ],
    });

    await story.save();
    res.status(201).json(story);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Story Controller
const deleteStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const userId = req.user._id;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (
      story.author.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this story" });
    }
    const choices = story.choices;
    const optionIds = choices.map((choice) => choice.linkedOption);

    await Option.deleteMany({ _id: { $in: optionIds } });
    await ChoiceAnalytics.deleteMany({ storyId });

    await Story.findByIdAndDelete(storyId);

    res.status(200).json({
      success: true,
      message: "Story and related data deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, unable to delete story",
    });
  }
};

const getStoryById = async (req, res) => {
  const { storyId } = req.params;

  try {
    const story = await Story.findById(storyId)
      .populate("choices.linkedOption")
      .populate("author", "name role");

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    const createdAt = new Date(story.createdAt);
    const publishDate = createdAt.toLocaleDateString();
    const publishTime = createdAt.toLocaleTimeString();

    res.status(200).json({
      story,
      author: story.author,
      publishedAt: {
        date: publishDate,
        time: publishTime,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getOptionById = async (req, res) => {
  const { linkedOptionId } = req.params;

  try {
    const option = await Option.findById(linkedOptionId);

    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }

    res.status(200).json(option);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("author", "name role");
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching stories" });
  }
};

const getMyStories = async (req, res) => {
  const userId = req.user.id;
  try {
    let stories;

    stories = await Story.find({ author: userId });

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).send("Error fetching stories", error);
  }
};

module.exports = {
  createStory,
  getStoryById,
  getOptionById,
  getAllStories,
  getMyStories,
  deleteStory,
};
