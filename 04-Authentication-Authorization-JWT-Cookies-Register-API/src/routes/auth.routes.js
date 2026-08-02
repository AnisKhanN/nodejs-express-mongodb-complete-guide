const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
/** POST /api/auth/register : This is the way we create the APIs */
router.post("/register", authController.registerUser);
module.exports = router;
