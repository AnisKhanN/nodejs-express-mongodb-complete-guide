const mongoose = require("mongoose"); /* Importing the Mongoose library to interact with the MongoDB database */
async function connectDB() {
  await mongoose
    .connect(
      "mongodb+srv://aniskhanniazi202_db_user:lNdX4jZevatuT35t@cluster0.e7dankz.mongodb.net/myDatabase",
      {},
    )
    .then(() => console.log("Connected to DB successfully"))
    .catch((err) => console.error("Could not connect to DB", err))
    .finally(() => console.log("Connection attempt finished"));
}
module.exports =
  connectDB; /* Exporting the connectDB function to be used in other parts of the application */
