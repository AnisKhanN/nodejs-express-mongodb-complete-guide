const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");

    console.error(err.message);

    process.exit(1);
  }
}

module.exports = connectDB;
/**const mongoose = require("mongoose");  Importing the Mongoose library to interact with the MongoDB database 
async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to DB successfully"))
    .catch((err) => console.error("Could not connect to DB", err))
    .finally(() => console.log("Connection attempt finished"));
}
module.exports =
  connectDB;  Exporting the connectDB function to be used in other parts of the application 
*/
