const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");
const router = express.Router();

router.post("/register", uploadMiddleware.handleFileUpload, registerUser);
router.post("/login", uploadMiddleware.handleFileUpload, loginUser);
router.get("/logout", logoutUser);

module.exports = router;