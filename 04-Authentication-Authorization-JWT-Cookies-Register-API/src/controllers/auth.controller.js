const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

function normalizeRegisterInput({ username, email, password }) {
  return {
    username: username?.trim(),
    email: email?.trim().toLowerCase(),
    password,
  };
}

async function registerUser(req, res) {
  try {
    const { username, email, password } = normalizeRegisterInput(req.body);

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
}

module.exports = { registerUser, normalizeRegisterInput };
