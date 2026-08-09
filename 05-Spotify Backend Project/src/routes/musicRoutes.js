const express = require("express");
const musicController = require("../controllers/musicController");
const authMiddleware = require("../middlewares/authMiddleWare");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const router = express.Router();

// GET all music: GET http://localhost:3000/api/music/
router.get(
  "/",
  authMiddleware.userOrArtistAuthMiddleware,
  musicController.getAllMusics
);

// Upload music: POST http://localhost:3000/api/music/upload and POST http://localhost:3000/api/music/upload/music
router.post(
  "/upload",
  authMiddleware.userAuthMiddleware,
  uploadMiddleware.handleFileUpload,
  musicController.createMusic
);
// same as above but with different path
router.post(
  "/upload/music",
  authMiddleware.userAuthMiddleware,
  uploadMiddleware.handleFileUpload,
  musicController.createMusic
);

// Upload album: POST http://localhost:3000/api/music/upload/album
router.post(
  "/upload/album",
  authMiddleware.artistAuthMiddleware,
  uploadMiddleware.handleFileUpload,
  musicController.createAlbum
);

// GET all albums: GET http://localhost:3000/api/music/albums
router.get(
  "/albums",
  authMiddleware.userOrArtistAuthMiddleware,
  musicController.getAllAlbums
);

router.get("/albums/:id", authMiddleware.userOrArtistAuthMiddleware, musicController.getAlbumById);
module.exports = router;