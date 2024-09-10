const express = require("express");
const {
  loginUser,
  registerUser,
  getAllUsers,
  updateUserRole,
} = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

userRouter.get(
  "/all-users",
  verifyToken,
  roleMiddleware(["admin"]),
  getAllUsers
);

userRouter.put(
  "/:userId/role",
  verifyToken,
  roleMiddleware(["admin"]),
  updateUserRole
);

module.exports = userRouter;
