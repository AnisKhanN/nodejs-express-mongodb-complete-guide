const mongoose = require("mongoose");

/**
 * Connect to MongoDB database using connection string from environment variables
 */
async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/notesDB";
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ Could not connect to MongoDB:", err.message);
  }
}

module.exports = connectDB;
