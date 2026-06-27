const express = require("express"); /* Importing the Express framework to create the server and handle routing */
const mongoose = require("mongoose"); /* Importing Mongoose for MongoDB operations and ObjectId validation */
const multer = require("multer"); /* Importing Multer for handling file uploads, if needed in the future */
const {
  uploadFile,
} = require("./services/storage.services"); /* Importing the uploadFile function from the storage services module for handling file uploads */ /* Configuring Multer to store uploaded files in memory */
const Post = require("./models/post.model"); /* Importing the Post model */
const app = express(); /* Creating an instance of the Express application */
app.use(
  express.json(),
); /* Middleware to parse incoming JSON requests, allowing the server to handle JSON data sent in the request body */
const upload = multer({
  storage: multer.memoryStorage(),
});
app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    const { caption } = req.body;
    const { image } = req.file ? req.file.buffer : null; // Ternary operator to check if req.file exists; if it does, extract the buffer, otherwise set image to null
    console.log(
      "Received request to create post with caption:",
      caption,
      req.file ? "Image data present" : "No image data",
    );
    const response = await uploadFile(
      req.file.buffer,
    ); /* Uploading the image file to the storage service and getting the result */
    console.log(
      "Image upload result:",
      response,
    ); /* Logging the result of the image upload for debugging purposes */

    console.log(
      "Received request to create post with image:",
      image ? "Image data present" : "No image data",
      req.file,
    );
    const newPost = new Post({ image, caption });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
/*
app.patch("/update-post/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;
    const { image } = req.file ? req.file.buffer : null;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find post by ID and update it
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { image, caption },
      {
        new: true,
        runValidators: true,
      } /* Return the updated document and run schema validators *,
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
*/
module.exports =
  app; /* Exporting the Express application instance so that it can be imported and used in other files, such as the server.js file where the server is started */
