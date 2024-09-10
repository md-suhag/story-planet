const express = require("express");
const {
  createStory,
  getStoryById,
  getOptionById,
  getAllStories,
  getMyStories,
  deleteStory,
} = require("../controllers/story.contoller");
const { verifyToken } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const storyRouter = express.Router();
storyRouter.get(
  "/all-story",
  verifyToken,

  getAllStories
);
storyRouter.get(
  "/my-story",
  verifyToken,
  roleMiddleware(["author", "admin"]),
  getMyStories
);

storyRouter.post(
  "/create",
  verifyToken,
  roleMiddleware(["author", "admin"]),
  createStory
);
storyRouter.get("/:storyId", verifyToken, getStoryById);
storyRouter.get("/options/:linkedOptionId", verifyToken, getOptionById);
storyRouter.delete(
  "/delete/:storyId",
  verifyToken,
  roleMiddleware(["author", "admin"]),
  deleteStory
);
module.exports = storyRouter;
