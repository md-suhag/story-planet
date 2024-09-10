const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist!" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
      role,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(201)
      .json({ success: true, message: "registered successfully!", token });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "register not successfull!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users data",
      error: error.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["author", "viewer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Only 'author' or 'viewer' roles are allowed.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user role",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
};
