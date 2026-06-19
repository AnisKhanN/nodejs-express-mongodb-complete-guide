const mongoose = require('mongoose'); /* Importing the Mongoose library to define the schema and model for the notes collection in the MongoDB database */
const noteSchema = new mongoose.Schema({
title: { type: String, required: true },
description: { type: String, required: true },
});
const noteModel = mongoose.model('Note', noteSchema); /* Creating a Mongoose model named 'Note' using the defined schema, which will be used to interact with the 'notes' collection in the MongoDB database */
module.exports = noteModel; /* Exporting the Note model to be used in other parts of the application */
/**
 * CRUD operations for the Note model:
 * Create: To create a new note, you can use the 'save' method on an instance of the Note model. For example:
 * const newNote = new noteModel({ title: 'Sample Note', description: 'This is a sample note.' });
 * await newNote.save();
 * Read: To read notes from the database, you can use the 'find' method. For example:
 * const notes = await noteModel.find();
 * Update: To update an existing note, you can use the 'findByIdAndUpdate' method. For example:
 * await noteModel.findByIdAndUpdate(noteId, { title: 'Updated Title', description: 'Updated description.' });
 * Delete: To delete a note, you can use the 'findByIdAndDelete' method. For example:
 * await noteModel.findByIdAndDelete(noteId);
 * These operations allow you to manage the notes in your application effectively using the Note model defined with Mongoose.
 */