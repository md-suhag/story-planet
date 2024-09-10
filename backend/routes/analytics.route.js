const express = require("express");
const {
  getTotalOptionsChoice,
  storeChoice,
} = require("../controllers/analytices.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/story/:storyId",
  verifyToken,
  roleMiddleware(["author", "admin"]),
  getTotalOptionsChoice
);
analyticsRouter.post("/choice", verifyToken, storeChoice);

module.exports = analyticsRouter;
