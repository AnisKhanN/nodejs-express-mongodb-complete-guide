const express = require("express");
const app = express();
app.use(express.json());
const validationRules = require("./middleware/ValidationMiddleware");

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Task Management API" });
});
app.post("/register", validationRules.registerUserValidationRules, (req, res) => {
    const { username, email, password } = req.body;
    res.status(201).json({ message: "User registered successfully", data: { username, email, password } });
});
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({ message: "User logged in successfully", data: { email, password } });
});
app.post("/logout", (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
});
module.exports = app;