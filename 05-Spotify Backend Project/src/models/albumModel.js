const mongoose = require("mongoose");
const { Schema } = mongoose;

const albumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artwork: {
        type: String,
        required: true,
    },
    musics: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "musics",
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    playCount: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: false,
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

const albumModel = mongoose.model("albums", albumSchema);
module.exports = albumModel;