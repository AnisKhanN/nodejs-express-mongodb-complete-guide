const express = require("express");
const mongoose = require("mongoose");
const noteModel = require("./models/note.model");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * POST /notes
 * Create a new note in MongoDB
 */
app.post("/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "Both title and description are required",
      });
    }

    const note = await noteModel.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
});

/**
 * GET /notes
 * Retrieve all notes from MongoDB
 */
app.get("/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({
      message: "Notes retrieved successfully",
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
});

/**
 * GET /notes/:id
 * Retrieve a single note by ID
 */
app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }

    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note retrieved successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch note",
      error: error.message,
    });
  }
});

/**
 * DELETE /notes/:id
 * Delete a note by its ID
 */
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }

    const deletedNote = await noteModel.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      note: deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
});

/**
 * PATCH /notes/:id
 * Partially update a note's title or description
 */
app.patch("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }

    const { title, description } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "At least title or description is required to update",
      });
    }

    const updatedNote = await noteModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update note",
      error: error.message,
    });
  }
});

module.exports = app;
