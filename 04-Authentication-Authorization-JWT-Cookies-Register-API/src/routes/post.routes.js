const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const router = express.Router();
router.post("/create", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
    localhost: 3000 / api / posts / create;
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      _id: decoded.id,
    });
    console.log(user);
  } catch (err) {
    return res.status(401).json({
      message: "Token is invalid",
    });
  }
  res.send("Post created Successfully");
});
module.exports = router;
