const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.route");
const storyRouter = require("./routes/story.route");
const { verifyToken } = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const analyticsRouter = require("./routes/analytics.route");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is working");
});
app.post("/test-user", verifyToken, (req, res) => {
  res.status(200).json({ success: true, message: "valid user" });
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/story", storyRouter);
app.use("/api/analytics", analyticsRouter);

// route not found
app.use((req, res, next) => {
  res.send("no route found");
});

// server error
app.use((err, req, res, next) => {
  res.send("internal server error");
  console.log(err.message);
});

module.exports = app;
