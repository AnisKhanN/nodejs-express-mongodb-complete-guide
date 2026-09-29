const express = require("express"); /* Importing the Express framework to create the server and handle routing */
const mongoose = require("mongoose"); /* Importing Mongoose for MongoDB operations and ObjectId validation */
const multer = require("multer"); /* Importing Multer for handling file uploads, if needed in the future */
const postModel = require("./models/post.model"); /* Importing the Post model for database operations */
const cors = require("cors");
const {
  uploadFile,
} = require("./services/storage.services"); /* Importing the uploadFile function from the storage services module for handling file uploads */ /* Configuring Multer to store uploaded files in memory */
const app = express(); /* Creating an instance of the Express application */
app.use(cors());
app.use(
  express.json(),
); /* Middleware to parse incoming JSON requests */
const upload = multer({
  storage: multer.memoryStorage(),
});
app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const response = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      image: response.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = app;
/** Example 2 
 app.post("/create-post", upload.single("image"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image."
            });
        }

        const response = await uploadFile(req.file.buffer);

        const post = await Post.create({
            image: response.url,
            caption: req.body.caption
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}); 
*/
