const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
/**
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
});
module.exports = mongoose.model("Post", postSchema);
*/
