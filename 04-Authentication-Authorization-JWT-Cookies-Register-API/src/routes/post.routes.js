const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const router = express.Router();

/**
 * POST /api/posts/create
 * Protected route that verifies JWT from cookies and creates a post
 */
router.post("/create", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    const { content, title } = req.body;

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      author: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      post: {
        title: title || "Untitled Post",
        content: content || "",
        createdAt: new Date(),
      },
    });
  } catch (err) {
    return res.status(401).json({
      message: "Token is invalid or expired",
      error: err.message,
    });
  }
});

module.exports = router;
