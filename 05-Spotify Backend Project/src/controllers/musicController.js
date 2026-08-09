const musicModel = require("../models/musicModel.js");
const albumModel = require("../models/albumModel.js");
const { uploadFile } = require("../services/storageService.js");

async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;
    const artistId = req.user?._id || req.user?.id;

    if (!artistId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const existingMusic = await musicModel.findOne({ title: title.trim() });
    if (existingMusic) {
      return res.status(400).json({ message: "Music with this title already exists" });
    }

    const uploadedFile = await uploadFile(file);
    if (!uploadedFile || !uploadedFile.url) {
      return res.status(500).json({ message: "Failed to upload file to storage" });
    }

    const newMusic = new musicModel({
      uri: uploadedFile.url,
      title: title.trim(),
      artist: artistId,
    });
    await newMusic.save();

    return res.status(201).json({
      message: "Music created successfully",
      music: newMusic,
    });
  } catch (error) {
    console.error("createMusic Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Create album function to handle album creation
async function createAlbum(req, res) {
  try {
    let { title, musics } = req.body;
    let artistId = req.user?._id || req.user?.id;

    if (!artistId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    if (req.body.data) {
      try {
        const parsed =
          typeof req.body.data === "string"
            ? JSON.parse(req.body.data)
            : req.body.data;
        if (parsed.title) title = parsed.title;
        if (parsed.musics) musics = parsed.musics;
        if (parsed.artist) artistId = parsed.artist;
      } catch (e) {
        // Data wasn't JSON string, continue with direct body properties
      }
    }

    // Parse musics parameter robustly
    if (typeof musics === "string") {
      try {
        musics = JSON.parse(musics);
      } catch (e) {
        if (musics.includes(",")) {
          musics = musics.split(",").map((id) => id.trim());
        } else {
          musics = [musics.trim()];
        }
      }
    }

    const albumArt = req.file;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!musics || (Array.isArray(musics) && musics.length === 0)) {
      return res.status(400).json({ message: "Music IDs (musics) are required" });
    }

    if (!albumArt) {
      return res.status(400).json({ message: "Album artwork is required" });
    }

    const existingAlbum = await albumModel.findOne({ title: title.trim() });
    if (existingAlbum) {
      return res.status(400).json({ message: "Album with this title already exists" });
    }

    const uploadedFile = await uploadFile(albumArt);
    if (!uploadedFile || !uploadedFile.url) {
      return res.status(500).json({ message: "Failed to upload artwork to storage" });
    }

    const formattedMusics = Array.isArray(musics) ? musics : [musics];

    const album = await albumModel.create({
      title: title.trim(),
      musics: formattedMusics,
      artwork: uploadedFile.url,
      artist: artistId,
    });

    return res.status(201).json({
      message: "Album created successfully",
      album: {
        id: album._id,
        title: album.title,
        musics: album.musics,
        artwork: album.artwork,
        artist: artistId,
      },
    });
  } catch (error) {
    console.error("createAlbum Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Get all musics function
async function getAllMusics(req, res) {
  try {
    const musics = await musicModel.find()
      .limit(10)
      .select("_id title uri artist")
      .populate("artist", "username email role");
    if (!musics) {
      return res.status(404).json({ message: "No musics found" });
    }
    return res.status(200).json({
      message: "Musics fetched successfully",
      count: musics.length,
      data: musics,
    });
  } catch (error) {
    console.error("getAllMusics Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
async function getAllAlbums(req, res) {
  try {
    const albums = await albumModel.find()
      .select("_id title artwork artist musics")
      .populate("artist", "username email role")
      .populate("musics", "uri title")
    if (!albums) {
      return res.status(404).json({ message: "No albums found" });
    }
    return res.status(200).json({
      message: "Albums fetched successfully",
      count: albums.length,
      data: albums,
    });
  } catch (error) {
    console.error("getAllAlbums Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
async function getAlbumById(req, res) {
  try {
    const album = await albumModel.findById(req.params.id)
      .select("_id title artwork artist musics")
      .populate("artist", "username email role")
      .populate("musics", "uri title");
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    return res.status(200).json({
      message: "Album fetched successfully",
      album: album,
    });
  } catch (error) {
    console.error("getAlbumById Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};

