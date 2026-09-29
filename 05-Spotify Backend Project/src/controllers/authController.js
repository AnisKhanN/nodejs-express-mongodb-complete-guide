const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// RegisterUser function to handle user registration
async function registerUser(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({
        message: "Password and at least username or email are required",
      });
    }

    // Check if user already exists
    const query = [];
    if (username) query.push({ username });
    if (email) query.push({ email });

    if (query.length > 0) {
      const existingUser = await userModel.findOne({ $or: query });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
    }

    // Creating a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Generating JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// LoginUser function to handle user login
async function loginUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const query = [];
    if (username) query.push({ username });
    if (email) query.push({ email });

    if (query.length === 0) {
      return res.status(400).json({ message: "Username or email is required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ $or: query });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generating JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// LogoutUser function to handle user logout
async function logoutUser(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = { registerUser, loginUser, logoutUser };
