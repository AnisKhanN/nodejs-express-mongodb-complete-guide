const express = require("express"); /* Importing the Express framework */
const app = express(); /* Creating an instance of the Express application */
app.use(express.json()); /** Middleware to parse JSON bodies */

const notes = []; /* In-memory array to store notes */

/**
 * POST /notes
 * Creates and appends a new note to the notes array
 */
app.post("/notes", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      message: "Both title and description are required",
    });
  }

  const newNote = { title, description, createdAt: new Date() };
  notes.push(newNote);

  res.status(201).json({
    message: "Note added successfully",
    note: newNote,
  });
});

/**
 * GET /notes
 * Retrieves all notes from the array
 */
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes fetched successfully",
    notes: notes,
  });
});

/**
 * DELETE /notes/:index
 * Removes a note from the array by its index
 */
app.delete("/notes/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= notes.length) {
    return res.status(404).json({
      message: "Note not found at given index",
    });
  }

  notes.splice(index, 1);
  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/**
 * PATCH /notes/:index
 * Updates note description by its index
 */
app.patch("/notes/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= notes.length) {
    return res.status(404).json({
      message: "Note not found at given index",
    });
  }

  const { description } = req.body;
  if (!description) {
    return res.status(400).json({
      message: "Description is required for update",
    });
  }

  notes[index].description = description;
  res.status(200).json({
    message: "Note updated successfully",
    note: notes[index],
  });
});

module.exports = app;
