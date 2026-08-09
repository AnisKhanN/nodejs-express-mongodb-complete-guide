const mongoose = require("mongoose");
const musicSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "albums",
    required: false,
  },
  playCount: {
    type: Number,
    default: 0,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });
const musicModel = mongoose.model("musics", musicSchema);
module.exports = musicModel;
